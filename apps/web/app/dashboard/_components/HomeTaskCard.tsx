import { Calendar, Dot } from "lucide-react";

import { iAssignedTaskData } from "../home/page";

const HomeTaskCard = ({ task }: { task: iAssignedTaskData }) => {
  return (
    <div className="w-full h-30 bg-white flex items-center justify-center">
      <div className="w-[95%] ">
        <div className="mb-1">
          <p className="text-xl font-semibold">{task.task}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg">{task.project}</span>
          <span className="flex items-center gap-1">
            <span className="text-sm text-zinc-500">
              <Dot className="h-8" />
            </span>
            <span className="text-sm text-zinc-500">
              <Calendar className="h-4" />
            </span>
            <span className="text-sm text-zinc-500 -ml-1">
              {task.createdOn}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeTaskCard;
