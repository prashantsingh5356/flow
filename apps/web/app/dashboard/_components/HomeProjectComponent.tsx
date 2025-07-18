"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import HomeProjectCard from "./HomeProjectCard";

import { tProjectData } from "../home/page";

const HomeProjectComponent = ({ data }: { data: tProjectData }) => {
  return (
    <div className="w-[49%] min-w-[470px]  max-h-[55vh] flex items-start  pt-3 mb-2">
      <div className="w-full max-h-[52vh] min-h-[30vh] bg-zinc-100">
        <div className="w-full h-20 flex justify-between border-dotted border-b-2 ">
          <div className="w-[75%] h-full  p-4 flex items-center">
            <span className=" text-xl font-semibold">Projects (2)</span>
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
        <div className="w-full min-h-43 max-h-83 flex justify-center ">
          <div className="w-full h-full  p-3 flex justify-between flex-wrap gap-2 ">
            {data.map((project) => (
              <HomeProjectCard project={project} key={project.projectName} />
            ))}
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

export default HomeProjectComponent;
