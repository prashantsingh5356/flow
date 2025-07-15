import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const NEXT_AUTH_CONFIG = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any) {
        console.log("--------------  From credentials -------------------");
        const cookiesValue = cookies();
        const typeOfAction = (await cookiesValue).get(
          "typeOfCredential"
        )?.value;

        console.log("------- type of credential --- " + typeOfAction);

        // parse user input using zod
        // Add logic here to check if user exists in DB
        // getting type of action (signup/signin)
        // (Sign up) if user exists in db then retun false (dont add user to db) and tell to sign in
        // (sign in) if user exists in db and password is match then retun true (dont add user to db)
        (await cookiesValue).delete("typeOfCredential");
        return {
          id: "user1",
          name: "asd",
          userId: "asd",
          email: "ramdomEmail",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
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
      }
      return session;
    },
    // redirect: async ({ url, baseUrl }: any) => {
    //   return baseUrl;
    // },
  },
  pages: {
    signIn: "/signin",
    error: "/signup",
  },
};
