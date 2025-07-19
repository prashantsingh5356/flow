"use client";

import Link from "next/link";

import { useSession } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarGroupAction,
} from "@/components/ui/sidebar";

import { Home, Settings, CircleCheck, Users } from "lucide-react";
import { Plus } from "lucide-react";

import TeamSwitcher from "./TeamSwitcher";
import ProjectNameAvatar from "./ProjectNameAvatar";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { activeSidebar } from "@/lib/features/sidebar/sidebar";
import { useEffect, useState } from "react";

const items = [
  {
    name: "home",
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
  },
  {
    name: "tasks",
    title: "My Tasks",
    url: "/dashboard/tasks",
    icon: CircleCheck,
  },
  {
    name: "settings",
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "members",
    title: "Members",
    url: "/dashboard/members",
    icon: Users,
  },
];

function AppSidebar() {
  const session = useSession();
  const dispatch = useAppDispatch();
  const [workspaceData, setworkspaceData] = useState([
    {
      id: "",
      name: "Test Corp.",
      description: "",
      image: "",
    },
  ]);

  const [workspaceProject, setWorkSpaceProject] = useState([
    {
      id: "",
      title: "App design and Development",
      description: "",
      url: "#",
    },
  ]);

  const sidebarVal = useAppSelector((state: RootState) => state.sidebar.value);
  const workspaceId = useAppSelector(
    (state: RootState) => state.sidebar.workspace
  );

  const getUserWorkspaces = async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/workspace?user=${session.data?.user?.email}`
    );

    const data = await response.json();

    const workspaceData = data.data.map((workspace: any) => {
      return {
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        image: workspace.image,
      };
    });

    setworkspaceData(() => [...workspaceData]);
  };

  const getWorkspaceProject = async (id: string) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/project?workspace=${id}`
    );

    const data = await response.json();

    const workspaceData = data.data.map((project: any) => {
      return {
        id: project.id,
        title: project.name,
        description: project.description,
        url: "#",
      };
    });
    setWorkSpaceProject(() => [...workspaceData]);
  };

  useEffect(() => {
    if (session.status !== "authenticated") return;
    getUserWorkspaces();
  }, [session.data]);

  useEffect(() => {
    if (session.status !== "authenticated") return;
    getWorkspaceProject(workspaceId);
  }, [workspaceId]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b-2 border-dotted text-2xl mt-2">
        <span className="mb-2">FLOW</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="border-b-2 border-dotted  ">
          <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
          <SidebarGroupAction title="Add Workspace">
            <Plus /> <span className="sr-only">Add Workspace</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <TeamSwitcher teams={workspaceData} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="border-b-2 border-dotted py-2 ">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={(e) => dispatch(activeSidebar(item.name))}
                      asChild
                      isActive={sidebarVal === item.name ? true : false}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="py-2">
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu className="py-1">
              {workspaceProject.map((project) => {
                return (
                  <SidebarMenuItem key={project.title}>
                    <SidebarMenuButton asChild>
                      <Link href={project.url}>
                        <ProjectNameAvatar projName={project.title} />
                        <span>{project.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
