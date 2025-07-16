"use client";

import Link from "next/link";

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

import { Home, Search, Settings, CircleCheck, Users } from "lucide-react";
import { AudioWaveform, Command, GalleryVerticalEnd, Plus } from "lucide-react";

import TeamSwitcher from "./TeamSwitcher";
import ProjectNameAvatar from "./ProjectNameAvatar";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { activeSidebar } from "@/lib/features/sidebar/sidebar";

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

const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

const projectList = [
  {
    title: "App design and Development",
    url: "#",
  },
  {
    title: "Web Design",
    url: "#",
  },
];

function AppSidebar() {
  const sidebarVal = useAppSelector((state: RootState) => state.sidebar.value);
  const dispatch = useAppDispatch();

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
            <TeamSwitcher teams={teams} />
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
              {projectList.map((project) => {
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
      <SidebarFooter className="bg-pink-400" />
    </Sidebar>
  );
}

export default AppSidebar;
