import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { NEXT_AUTH_CONFIG } from "@/lib/auth";
const Home = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  console.log(session);

  if (!session) redirect("/signin");
  redirect("/dashboard/home");

  return (
    <>
      <div className=" w-full h-[100vh]">
        <h1>this is dashboard page : {session?.user.email}</h1>
      </div>
    </>
  );
};

export default Home;
