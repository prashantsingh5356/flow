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
import { useEffect, useState } from "react";
import TaskFilterComponent from "./TaskFilterComponent";

import { taskColumns, Task } from "./TaskColumns";
import TaskDataTable from "./TaskDataTable";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

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

const TASK_DATA: Task = {
  id: "1211212",
  name: "Make a youtube video",
  projectName: "Mobile app development",
  assignee: "Ashutosh Singh",
  dueDate: "October 15th, 2024",
  status: "In Progress",
};

type tTableData = Task[];

const TaskComponent = () => {
  const workspace = useAppSelector(
    (state: RootState) => state.sidebar.workspace
  );
  const [filterData, setFilterData] = useState(FILTER_TYPES);
  const [taskData, setTaskData] = useState<tTableData>([TASK_DATA]);
  const [activeTask, setActiveTask] = useState("Table");

  const getAllTaskInworkspace = async (id: string) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/task?workspace=${id}`
    );

    const result = await response.json();
    if (result.message !== "Success") return;
    setTaskData(result.data);
  };

  const getAllMembersInWorkspace = async (id: string) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/member?workspace=${id}`
    );
    const result = await response.json();
    if (!result) return;

    const memberArr = result.data.map((member: any) => member.name);

    const assigneeData = {
      name: "Assignees",
      defaultValue: "All assignees",
      values: [...memberArr],
      leftIcon: User,
      rightIcon: ChevronsUpDown,
    };

    setFilterData((prev: any) => {
      const getFilterData = prev.filter(
        (data: any) => data.name !== "Assignees"
      );
      return [...getFilterData, assigneeData];
    });
  };

  const getAllProjectsInworkspace = async (id: string) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/project?workspace=${id}`
    );
    const result = await response.json();
    if (!result) return;

    const projects = result.data.map((project: any) => project.name);

    const projectsData = {
      name: "Projects",
      defaultValue: "All Projects",
      values: [...projects],
      leftIcon: Folder,
      rightIcon: ChevronsUpDown,
    };

    setFilterData((prev: any) => {
      const getFilterData = prev.filter(
        (data: any) => data.name !== "Projects"
      );
      return [...getFilterData, projectsData];
    });
  };

  useEffect(() => {
    if (!workspace) return;
    getAllTaskInworkspace(workspace);
    getAllMembersInWorkspace(workspace);
    getAllProjectsInworkspace(workspace);
  }, [workspace]);
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
        {filterData.map((filter, i) => {
          return <TaskFilterComponent filter={filter} key={i} />;
        })}
      </div>
      <div className="  w-full min-h-[71vh] overflow-x-scroll ">
        <TaskDataTable columns={taskColumns} data={taskData} />
      </div>
    </div>
  );
};

export default TaskComponent;
