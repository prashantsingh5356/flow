import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

import { prisma } from "@repo/db";
import { UserSchema, type User } from "@repo/validation";

import bcrypt from "bcrypt";

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
          const user = await prisma.user.create({ data: userData });
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }

        // sign In
        // User does not exists, so create user while sign in
        if (!userExist) {
          const user = await prisma.user.create({ data: userData });
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            name: user.name,
            image: user.image,
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
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      //   console.log(user);

      if (user) {
        token.uid = user.id;
        token.uFirstName = user.firstName;
        token.uLastName = user.lastName;
      }
      return token;
    },
    signIn: async ({ account, profile }: any) => {
      if (account.provider === "google") {
        const cookieStore = cookies();
        // Add logic here to check if user exists in DB
        // if user exists in db then retun true (dont add user to db)
        // if user does not exist in db then create user and return true
        // getting type of action (signup/signin)

        const typeOfAction = (await cookieStore).get("typeOfGoogle")?.value;
        console.log("--------- type is " + typeOfAction);

        (await cookieStore).delete("typeOfGoogle");
        return true;
      }
      return true;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.firstName = token.uFirstName;
        session.user.lastName = token.uLastName;
      }
      //   console.log("---------- session details -------------");
      //   console.log(session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signup",
  },
};
