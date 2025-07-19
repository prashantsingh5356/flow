import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { NEXT_AUTH_CONFIG } from "@/lib/auth";
const Home = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) redirect("/signin");

  return (
    <>
      <div className=" w-full h-[100vh]">
        <h1>this is Tasks page : {session?.user.email}</h1>
      </div>
    </>
  );
};

export default Home;
