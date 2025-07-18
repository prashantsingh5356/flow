import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import AnalyticsCard from "../_components/AnalyticsCard";

import { IconType } from "react-icons";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import HomeTasksComponents from "../_components/HomeTasksComponent";
import HomeProjectComponent from "../_components/HomeProjectComponent";
import HomeMembersComponent from "../_components/HomeMembersComponent";

export interface iAnalyticsData {
  title: string;
  icon: IconType;
  value: string;
  type: string;
}

export interface iAssignedTaskData {
  id: string;
  task: string;
  project: string;
  createdOn: string;
}

export interface iProjectData {
  id: string;
  projectName: string;
  createdOn: string;
}

export interface iMembersData {
  id: string;
  name: string;
  email: string;
  image: string;
}

export type tAnalyticsData = iAnalyticsData[];
export type tAssignedTaskData = iAssignedTaskData[];
export type tProjectData = iProjectData[];
export type tMembersData = iMembersData[];

const analyticsData: tAnalyticsData = [
  { title: "Total Projects", icon: FaCaretUp, value: "2", type: "up" },
  { title: "Total Tasks", icon: FaCaretUp, value: "14", type: "up" },
  { title: "Assigned Tasks", icon: FaCaretUp, value: "7", type: "up" },
  { title: "Completed Tasks", icon: FaCaretUp, value: "2", type: "up" },
  { title: "Overdue Tasks", icon: FaCaretDown, value: "0", type: "down" },
];

const assignedTasksData: tAssignedTaskData = [
  {
    id: "1",
    task: "Conduct usability testing",
    project: "Mobile App Development",
    createdOn: "time",
  },
  {
    id: "1",
    task: "Implement offline mode",
    project: "Mobile App Development",
    createdOn: "time",
  },
  {
    id: "1",
    task: "Integrate push notification",
    project: "Mobile App Development",
    createdOn: "time",
  },
  { id: "1", task: "Task title", project: "Project name", createdOn: "time" },
  { id: "1", task: "Task title", project: "Project name", createdOn: "time" },
];

const projectData: tProjectData = [
  { id: "1", projectName: "App Design and Development", createdOn: "time" },
  { id: "1", projectName: "Web Design", createdOn: "time" },
];

const membersData: tMembersData = [
  { id: "1", name: "Antonio", email: "antonio@gmail.com", image: "img source" },
  { id: "1", name: "Admin", email: "admin@gmail.com", image: "img source" },
  {
    id: "1",
    name: "Prashant",
    email: "prashantsingh5356@gmail.com",
    image: "img source",
  },
];

const Home = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  console.log("============== session data =====================");
  console.log(session);

  if (!session) redirect("/signin");

  return (
    <>
      <div className=" w-full ">
        <div className="w-full min-h-[90vh] py-3">
          <div className="w-full flex flex-wrap gap-1">
            {analyticsData.map((analytics) => (
              <AnalyticsCard data={analytics} key={analytics.title} />
            ))}
          </div>
          <div className="w-full flex justify-between flex-wrap">
            <HomeTasksComponents data={assignedTasksData} />
            <HomeProjectComponent data={projectData} />
          </div>
          <div className="w-[49%] bg-zinc-100 min-h-50  flex justify-center items-center">
            <HomeMembersComponent data={membersData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
