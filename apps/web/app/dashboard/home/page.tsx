import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import AnalyticsCard from "../_components/AnalyticsCard";

import { IconType } from "react-icons";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";

export interface iAnalyticsData {
  title: string;
  icon: IconType;
  value: string;
  type: string;
}

export type tAnalyticsData = iAnalyticsData[];

const analyticsData: tAnalyticsData = [
  { title: "Total Projects", icon: FaCaretUp, value: "2", type: "up" },
  { title: "Total Tasks", icon: FaCaretUp, value: "14", type: "up" },
  { title: "Assigned Tasks", icon: FaCaretUp, value: "7", type: "up" },
  { title: "Completed Tasks", icon: FaCaretUp, value: "2", type: "up" },
  { title: "Overdue Tasks", icon: FaCaretDown, value: "0", type: "down" },
];

const Home = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  console.log(session);

  if (!session) redirect("/signin");

  return (
    <>
      <div className=" w-full">
        <div className="w-full min-h-[90vh] py-3">
          {/* <h1>this is Home page : {session?.user.email}</h1> */}
          <div className="w-full flex flex-wrap">
            {analyticsData.map((analytics) => (
              <AnalyticsCard data={analytics} key={analytics.title} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
