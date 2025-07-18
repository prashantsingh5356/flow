import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import AnalyticsCard from "../_components/AnalyticsCard";

import { prisma } from "@repo/db";

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

let analyticsData: tAnalyticsData = [];

let assignedTasksData: tAssignedTaskData = [];

const getAllAssignedTaskInWorkspace = async (
  workspaceId: string,
  email: string
) => {
  const tasksInSelectedworkspaceAndOfUser = await prisma.tasks.findMany({
    where: {
      AND: [{ workspaceId: workspaceId }, { assignee: email }],
    },
    include: {
      project: {
        select: {
          name: true,
        },
      },
    },
  });

  const allTasksInWorkspace = await prisma.tasks.findMany({
    where: {
      workspaceId: workspaceId,
    },
  });

  const allCompletedTaskInWorkspace = allTasksInWorkspace.filter(
    (task) => task.completed
  );

  const data = tasksInSelectedworkspaceAndOfUser.map((task) => {
    return {
      id: task.id,
      task: task.name,
      project: task.project.name,
      createdOn: task.createdOn,
    };
  });

  assignedTasksData = [...data];

  const assignedTasks = tasksInSelectedworkspaceAndOfUser.length;
  const totalTask = allTasksInWorkspace.length;
  const completedTasks = allCompletedTaskInWorkspace.length;

  analyticsData = [
    { title: "Total Projects", icon: FaCaretUp, value: "", type: "" },
    {
      title: "Total Tasks",
      icon: totalTask > 0 ? FaCaretUp : FaCaretDown,
      value: String(totalTask),
      type: totalTask > 0 ? "up" : "down",
    },
    {
      title: "Assigned Tasks",
      icon: assignedTasks > 0 ? FaCaretUp : FaCaretDown,
      value: String(assignedTasks),
      type: assignedTasks > 0 ? "up" : "down",
    },
    {
      title: "Completed Tasks",
      icon: completedTasks > 0 ? FaCaretUp : FaCaretDown,
      value: String(completedTasks),
      type: completedTasks > 0 ? "up" : "down",
    },
    { title: "Overdue Tasks", icon: FaCaretDown, value: "0", type: "down" },
  ];
};

let projectData: tProjectData = [];

const getAllWorkspaceProjects = async (workspaceId: string) => {
  const projectsInSelectedWorkspace = await prisma.projects.findMany({
    where: {
      workspaceId: workspaceId,
    },
  });

  const data = projectsInSelectedWorkspace.map((project) => {
    return {
      id: project.id,
      projectName: project.name ?? "",
      createdOn: String(project.createdOn) ?? "",
    };
  });

  projectData = [...data];

  const totalProject = projectsInSelectedWorkspace.length;
  analyticsData = analyticsData.map((data) => {
    if (data.title !== "Total Projects") return { ...data };
    return {
      title: data.title,
      icon: totalProject > 0 ? FaCaretUp : FaCaretDown,
      value: String(totalProject),
      type: totalProject > 0 ? "up" : "down",
    };
  });
};

let membersData: tMembersData = [];

const getAllWorkspaceMembers = async (workspaceId: string) => {
  const membersInWorkspace = await prisma.members.findMany({
    where: {
      workspaceId: workspaceId,
    },
    include: {
      user: true,
    },
  });

  const data = membersInWorkspace.map((member) => {
    return {
      name: member.user.name ?? "",
      email: member.user.email ?? " ",
      image: member.user.image ?? "",
      id: member.user.id,
    };
  });
  membersData = [...data];
};

const Home = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) redirect("/signin");
  const { user } = session;
  console.log(user);

  // Getting All workspace of User
  const workspaces = await prisma.workspace.findMany({
    where: {
      userId: user.id,
    },
  });

  // Getting selected workspace by user
  const selectedWorkspace = workspaces[1];

  // Getting all tasks in the selected workspaces
  await getAllAssignedTaskInWorkspace(selectedWorkspace?.id ?? "", user.email);

  // Getting all projects in the selected workspace
  await getAllWorkspaceProjects(selectedWorkspace?.id ?? "");

  // Getting all members in the selected workspace
  await getAllWorkspaceMembers(selectedWorkspace?.id ?? "");

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
