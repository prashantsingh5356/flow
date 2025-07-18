"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import HomeTaskCard from "./HomeTaskCard";

import { iAssignedTaskData } from "../home/page";

type tData = {
  data: iAssignedTaskData[];
};

const HomeTasksComponents = ({ data }: tData) => {
  return (
    <div className="w-[49%] min-w-[470px] flex items-center pt-3 mb-2">
      <div className="w-full min-h-[48vh]  bg-zinc-100">
        <div className="w-full h-20 flex justify-between border-dotted border-b-2 ">
          <div className="w-[75%] h-full  p-4 flex items-center">
            <span className=" text-xl font-semibold">
              Assigned Tasks ({data.length})
            </span>
          </div>
          <div className=" w-[10%] h-full flex items-center justify-center ">
            <Button
              variant="secondary"
              className="bg-zinc-200 hover:bg-zinc-300"
            >
              <Plus />
            </Button>
          </div>
        </div>
        <div className="w-full h-83  flex justify-center ">
          <div className="w-full h-full  p-3 flex flex-col gap-2">
            {data.map(
              (task, i) => i < 3 && <HomeTaskCard key={i} task={task} />
            )}
          </div>
        </div>
        <div className="p-3">
          <div className="w-full h-15  p-2">
            <Button
              variant="secondary"
              className="w-full bg-zinc-200 hover:bg-zinc-300"
            >
              Show All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTasksComponents;
