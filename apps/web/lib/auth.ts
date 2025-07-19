import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

import { prisma } from "@repo/db";
import { UserSchema, type User } from "@repo/validation";

import bcrypt from "bcrypt";

type tUserGoogleDetails = Pick<
  User,
  "email" | "firstName" | "lastName" | "image" | "name"
>;

export const NEXT_AUTH_CONFIG = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
        firstName: { label: "firstName", type: "text", placeholder: "" },
        lastName: { label: "lastName", type: "text", placeholder: "" },
      },
      async authorize(credentials: any) {
        // 1. Parse user data using zod
        const userData: User = {
          email: credentials?.email,
          password: credentials?.password,
          name: credentials?.name ?? "Your name",
          firstName: credentials?.firstName ?? "",
          lastName: credentials?.lastName ?? "",
          image: credentials?.image ?? "",
        };

        // hash user password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // replace user password with hashed password
        userData.password = hashedPassword;

        const result = UserSchema.safeParse(userData);

        if (!result.success) throw new Error("Invalid user credentials");

        // 2. Check If user exists in DB
        const userExist = await prisma.user.findFirst({
          where: {
            email: userData.email,
          },
          include: {
            role: {
              select: {
                role: true,
              },
            },
          },
        });

        // 2.1 get type of action
        // sign up

        const cookiesValue = cookies();
        const typeOfAction = (await cookiesValue).get(
          "typeOfCredential"
        )?.value;

        if (userExist && typeOfAction === "signup") {
          (await cookiesValue).delete("typeOfCredential");
          throw new Error(
            "User already exists with this email, Login to continue"
          );
        }

        if (!userExist && typeOfAction === "signup") {
          (await cookiesValue).delete("typeOfCredential");
          const user = await prisma.user.create({
            data: {
              name: userData.name,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              image: userData.image,
              password: userData.password,
              role: {
                create: { role: "admin" },
              },
            },
            include: {
              role: {
                select: {
                  role: true,
                },
              },
            },
          });

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role[0]?.role ?? "member",
          };
        }

        // sign In
        // User does not exists, so create user while sign in
        if (!userExist) {
          const user = await prisma.user.create({
            data: {
              name: userData.name,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              image: userData.image,
              password: userData.password,
              role: {
                create: { role: "admin" },
              },
            },
            include: {
              role: {
                select: {
                  role: true,
                },
              },
            },
          });

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role[0]?.role ?? "member",
          };
        }
        // User exists, so return the user after cheking password
        const passwordMatch = await bcrypt.compare(
          credentials?.password,
          userExist.password
        );

        if (userExist && !passwordMatch) {
          throw new Error("Wrong Email or Password");
        }

        return {
          id: userExist.id,
          firstName: userExist.firstName,
          lastName: userExist.lastName,
          email: userExist.email,
          name: userExist.name,
          image: userExist.image,
          role: userExist.role[0]?.role ?? "member",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user, account, profile }: any) => {
      if (account.provider === "google") {
        // get type of google action (signup/signin)
        const cookieStore = cookies();
        const typeOfAction = (await cookieStore).get("typeOfGoogle")?.value;

        // Get User Details from google
        const userGoogleDetails: tUserGoogleDetails = {
          email: profile?.email,
          name: profile?.name,
          image: profile?.picture,
          firstName: profile?.given_name,
          lastName: profile?.family_name,
        };

        // check if user exists in DB
        const isUserExist = await prisma.user.findFirst({
          where: {
            email: userGoogleDetails.email,
          },
          include: {
            role: {
              select: {
                role: true,
              },
            },
          },
        });

        // signup google action
        if (isUserExist && typeOfAction === "signup") {
          (await cookieStore).delete("typeOfGoogle");
          throw new Error(
            "User already exists with this email, login to continue"
          );
        }

        if (!isUserExist && typeOfAction === "signup") {
          (await cookieStore).delete("typeOfGoogle");
          const userRes = await prisma.user.create({
            data: {
              ...userGoogleDetails,
              password: "GOOGLE_SIGNUP",
              role: {
                create: {
                  role: "admin",
                },
              },
            },
            include: {
              role: {
                select: {
                  role: true,
                },
              },
            },
          });
          user.id = userRes?.id;
          user.firstName = userRes?.firstName ?? "";
          user.lastName = userRes?.lastName ?? "";
          user.role = userRes?.role[0]?.role ?? "member";
          return true;
        }

        // signin google action
        if (!isUserExist) {
          const userRes = await prisma.user.create({
            data: {
              ...userGoogleDetails,
              password: "GOOGLE_SIGNUP",
              role: {
                create: {
                  role: "admin",
                },
              },
            },
            include: {
              role: {
                select: {
                  role: true,
                },
              },
            },
          });
          user.id = userRes?.id;
          user.firstName = userRes?.firstName ?? "";
          user.lastName = userRes?.lastName ?? "";
          user.role = userRes?.role[0]?.role ?? "member";
          return true;
        }

        user.id = isUserExist?.id;
        user.firstName = isUserExist?.firstName ?? "";
        user.lastName = isUserExist?.lastName ?? "";
        user.role = isUserExist?.role[0]?.role ?? "member";
        return true;
      }
      return true;
    },
    jwt: async ({ user, token, profile }: any) => {
      if (user) {
        token.uid = user.id;
        token.uFirstName = user.firstName;
        token.uLastName = user.lastName;
        token.uRole = user.role;
      }

      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.firstName = token.uFirstName;
        session.user.lastName = token.uLastName;
        session.user.role = token.uRole;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signup",
  },
};
