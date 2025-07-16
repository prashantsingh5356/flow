"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

const breadCrumbDetails = {
  home: {
    title: "Home",
    description: "Monitor all of your projects and tasks here",
  },
  members: {
    title: "Members",
    description: "Control access of all members in you workspace from here",
  },
  settings: {
    title: "Settings",
    description: "Customize you workspace setting from here",
  },
  tasks: {
    title: "My Tasks",
    description: "Monitor all you tasks from here",
  },
};

const NavBreadCrumb = () => {
  const sidebarVal = useAppSelector((state: RootState) => state.sidebar.value);

  const currentBredcrumbValue =
    breadCrumbDetails[sidebarVal as keyof typeof breadCrumbDetails];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="flex flex-col items-start">
          <BreadcrumbPage className="font-semibold">
            {currentBredcrumbValue.title}
          </BreadcrumbPage>
          <span>{currentBredcrumbValue.description}</span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavBreadCrumb;
