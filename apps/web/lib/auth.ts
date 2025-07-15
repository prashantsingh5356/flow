import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
        // return profile.email_verified && profile.email.endsWith("@example.com");
        // Add logic here to check if user exists in DB and then return true/false
        console.log("---------------- log in with google -----------------");

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
  },
  pages: {
    signIn: "/signin",
  },
};
