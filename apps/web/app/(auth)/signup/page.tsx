import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { redirect } from "next/navigation";

import SignupForm from "./_components/SignUp";

export default async function () {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return (
    <>
      {session ? (
        redirect("/")
      ) : (
        <div className=" w-full h-full flex justify-center items-center">
          <div className="w-[70%] min-h-[80vh] flex flex-col justify-center ">
            <SignupForm />
          </div>
        </div>
      )}
    </>
  );
}
