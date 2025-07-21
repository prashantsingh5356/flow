"use client";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";

export type Task = {
  id: string;
  name: string;
  projectName: string;
  assignee: string;
  dueDate: string;
  status: string;
  test?: string;
};

export const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Task Name",
    cell: ({ row }) => {
      const taskName: string = row.getValue("name");
      return (
        <div className=" h-10 flex items-center cursor-pointer ">
          <div className=" text-zinc-600 font-medium">{taskName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "projectName",
    header: "Project",
    cell: ({ row }) => {
      const projectName: string = row.getValue("projectName");

      return (
        <div className=" h-10 flex items-center cursor-pointer">
          <div className="flex gap-2">
            <Avatar className=" rounded-lg w-7 h-7 bg-blue-500 text-white flex items-center justify-center">
              <AvatarFallback className="bg-blue-500 font-semibold">
                {projectName?.split("")[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className=" flex items-center">{projectName}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => {
      const assigneeName: string = row.getValue("assignee");

      return (
        <div className=" h-10 flex items-center cursor-pointer">
          <div className="flex gap-2">
            <Avatar className=" rounded-full w-7 h-7 bg-zinc-300 text-zinc-700 flex items-center justify-center">
              <AvatarFallback className="bg-zinc-300 font-semibold">
                {assigneeName?.split("")[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className=" flex items-center">{assigneeName}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDateVal: string = row.getValue("dueDate");
      return (
        <div className=" h-10 flex items-center cursor-pointer ">
          <div className=" text-zinc-600 font-medium">{dueDateVal}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return (
        <div className=" h-10 flex items-center ">
          <div className=" bg-red-400 py-1 px-2 rounded-2xl text-white font-semibold">
            {status}
          </div>
        </div>
      );
    },
  },
];
