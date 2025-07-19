"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronsUpDown, Plus } from "lucide-react";

import { useAppDispatch } from "@/lib/hooks";
import { activeWorkspace } from "@/lib/features/sidebar/sidebar";

import Cookies from "js-cookie";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

function TeamSwitcher({
  teams,
}: {
  teams: {
    id: string;
    name: string;
    image: string;
    description: string;
  }[];
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState({
    id: "",
    name: "",
    image: "",
    description: "",
  });

  if (!activeTeam) {
    return null;
  }

  React.useEffect(() => {
    // if (Cookies.get("active_workspace")) return;

    dispatch(
      activeWorkspace(
        activeTeam.id ? (activeTeam.id ?? "") : (teams[0]?.id ?? "")
      )
    );

    Cookies.set(
      "active_workspace",
      activeTeam.id ? (activeTeam.id ?? "") : (teams[0]?.id ?? "")
    );

    router.refresh();
  }, [teams]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Avatar>
                  <AvatarFallback>
                    {!activeTeam.id
                      ? teams[0]?.name.split("")[0]
                      : activeTeam.name.split("")[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {!activeTeam.id ? teams[0]?.name : activeTeam.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => {
                  dispatch(activeWorkspace(team.id));
                  Cookies.set("active_workspace", team.id);
                  router.refresh();
                  return setActiveTeam(team);
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Avatar>
                    <AvatarFallback>{team.name.split("")[0]}</AvatarFallback>
                  </Avatar>
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default TeamSwitcher;
