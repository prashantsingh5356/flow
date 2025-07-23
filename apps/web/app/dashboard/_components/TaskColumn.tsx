import { CheckCircle } from "lucide-react";
import { Column } from "./TaskKanban";
import TaskCard from "./TaskCard";

import { Droppable } from "@hello-pangea/dnd";

const TaskColumn = ({
  column,
  tasks,
}: {
  column: Column | undefined;
  tasks:
    | {
        id: string;
        content: string;
      }[]
    | undefined;
}) => {
  return (
    <div className="rounded-md overflow-hidden max-w-[320px]  min-w-[300px] bg-zinc-100 px-2 py-4 flex flex-col items-center gap-2">
      <div className=" w-full flex gap-2 px-2">
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 text-red-500" />
        </div>
        <div className="font-medium ">{column?.title}</div>
        <div className=" w-6 h-full flex items-center justify-center">
          <span className="bg-zinc-300 w-5 h-5 rounded-sm text-sm flex items-center justify-center text-zinc-600">
            {tasks?.length}
          </span>
        </div>
      </div>
      <Droppable droppableId={column?.id ?? `${String(Math.random())}`}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-[95%] min-h-[50vh] flex flex-col gap-4"
          >
            {tasks?.map((task, i) => (
              <TaskCard key={task.id} index={i} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
