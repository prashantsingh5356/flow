import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import MemberHeaderComponent from "../_components/MemberHeaderComponent";
import MemberComponent from "../_components/MemberComponent";

const Home = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) redirect("/signin");

  return (
    <>
      <div className=" w-full min-h-[85vh]  py-4 ">
        <div className="w-[95%] sm:w-[70%]  md:w-[60%] lg:w-[50%] xl:w-[40%] min-h-[85vh]  bg-zinc-100 mx-auto rounded-md ">
          <MemberHeaderComponent />
          <MemberComponent />
        </div>
      </div>
    </>
  );
};

export default Home;
