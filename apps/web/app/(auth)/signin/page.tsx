"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();

  return (
    <>
      <h1>This is sign in page</h1>
      <div>
        <button
          onClick={async () => {
            await signIn("google", { callbackUrl: "/" });
          }}
        >
          Login with google
        </button>
        <br />
        <button
          onClick={async () => {
            const res = await signIn("credentials", {
              username: "jfjqwvcjkawvcjq",
              password: "fvjwqvfjqhvfqwvf",
              redirect: false,
            });
            console.log(res);
            router.push("/");
          }}
        >
          Login with email
        </button>
      </div>
    </>
  );
}
