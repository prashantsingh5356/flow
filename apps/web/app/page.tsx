"use client";

// import { prisma } from "@repo/db";
// import { Card } from "@repo/ui/card";
// import { Button } from "@/components/ui/button";
// import { UserSchema, type User } from "@repo/validation";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);

  return (
    <>
      <h1 className="text-2xl text-center">Jira clone landing Page</h1>
      <div className="bg-amber-200 w-full border-2 min-h-10">
        {JSON.stringify(session.data)}
      </div>
      <button onClick={() => signIn()}>Signin</button>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
