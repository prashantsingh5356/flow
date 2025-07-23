import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import TaskComponent from "../_components/TaskComponent";
const Home = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) redirect("/signin");

  return (
    <>
      <div className=" w-full min-h-[90vh] px-8 py-2 ">
        <div className="w-full min-h-[90vh] border-1 rounded-md px-4 py-3 ">
          <TaskComponent />
        </div>
      </div>
    </>
  );
};

export default Home;
