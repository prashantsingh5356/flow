"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const session = useSession();
  console.log("============== session data =====================");
  console.log(session);

  return (
    <>
      <h1 className="text-2xl text-center">Jira clone landing Page</h1>
      <div className="bg-amber-200 w-full border-2 min-h-10">
        {JSON.stringify(session.data)}
      </div>
      <button onClick={() => signIn()}>Signin</button>
      <button onClick={() => signOut()}>Sign out</button>
      <button onClick={() => router.push("/signup")}>Sign Up</button>
      <button onClick={() => router.push("/dashboard")}>Dashboard</button>
    </>
  );
}
