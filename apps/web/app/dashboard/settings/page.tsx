import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import SettingHeader from "../_components/SettingHeader";
import SettingComponent from "../_components/SettingComponent";
const Home = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) redirect("/signin");

  return (
    <div className=" w-full py-4 ">
      <div className="w-[95%] sm:w-[70%]  md:w-[60%] lg:w-[50%] xl:w-[40%] bg-zinc-100 mx-auto rounded-md pb-3">
        <SettingHeader />
        <SettingComponent />
      </div>
    </div>
  );
};

export default Home;
