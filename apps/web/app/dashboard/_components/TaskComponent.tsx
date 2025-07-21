"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronsUpDown,
  Folder,
  ListCheck,
  Plus,
  User,
} from "lucide-react";
import { useState } from "react";
import TaskFilterComponent from "./TaskFilterComponent";

const FILTER_TYPES = [
  {
    name: "Status",
    defaultValue: "All Status",
    values: ["Todo", "In Progress", "In Review", "Backlog", "Done"],
    leftIcon: ListCheck,
    rightIcon: ChevronsUpDown,
  },
  {
    name: "Assignees",
    defaultValue: "All Assignees",
    values: [],
    leftIcon: User,
    rightIcon: ChevronsUpDown,
  },
  {
    name: "Projects",
    defaultValue: "All Projects",
    values: [],
    leftIcon: Folder,
    rightIcon: ChevronsUpDown,
  },
  {
    name: "Due Date",
    defaultValue: "Due Date",
    values: [],
    leftIcon: Calendar,
  },
];

const TaskComponent = () => {
  const [activeTask, setActiveTask] = useState("Table");
  return (
    <div className="w-full min-h-[85vh] ">
      <div className="w-full min-h-15  flex gap-2  items-center justify-between border-b-2 border-dotted">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              return setActiveTask("Table");
            }}
            variant="secondary"
            className={`${activeTask === "Table" && "bg-zinc-200"} ${activeTask === "Table" ? "hover:bg-zinc-200 text-black" : "hover:bg-zinc-100 text-zinc-500"}`}
          >
            Table
          </Button>
          <Button
            onClick={() => {
              return setActiveTask("Kanban");
            }}
            className={`${activeTask === "Kanban" && "bg-zinc-200"} ${activeTask === "Kanban" ? "hover:bg-zinc-200 text-black" : "hover:bg-zinc-100 text-zinc-500"}`}
            variant="secondary"
          >
            Kanban
          </Button>
          <Button
            onClick={() => {
              return setActiveTask("Calendar");
            }}
            className={`${activeTask === "Calendar" && "bg-zinc-200"} ${activeTask === "Calendar" ? "hover:bg-zinc-200 text-black" : "hover:bg-zinc-100 text-zinc-500"}`}
            variant="secondary"
          >
            Calendar
          </Button>
        </div>
        <div>
          <Button
            variant="destructive"
            className="bg-blue-700 hover:bg-blue-600 hover:scale-105"
          >
            <Plus />
            New
          </Button>
        </div>
      </div>
      <div className="  w-full min-h-20  flex gap-2  items-center border-b-2 border-dotted">
        {FILTER_TYPES.map((filter, i) => {
          return <TaskFilterComponent filter={filter} key={i} />;
        })}
      </div>
    </div>
  );
};

export default TaskComponent;
