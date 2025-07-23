import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Draggable } from "@hello-pangea/dnd";
import { Dot, Ellipsis } from "lucide-react";

const TaskCard = ({
  task,
  index,
}: {
  task: { id: string; content: string };
  index: number;
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className=" w-full min-h-[18vh] bg-white rounded-md overflow-hidden p-2"
        >
          <div className="w-full h-full ">
            <div className="w-full h-[50]  flex justify-between items-center border-b-2 border-dotted">
              <span>{task.content}</span>
              <span>
                <Ellipsis className="text-zinc-500" />
              </span>
            </div>
            <div className="w-full h-[100] ">
              <div className="w-full h-[50]  flex items-center ">
                <div>
                  <Avatar className="h-6 w-6 bg-zinc-300 overflow-hidden">
                    <AvatarFallback className=" bg-zinc-300 text-sm font-bold text-zinc-500">
                      J
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <Dot className="text-zinc-500" />
                </div>
                <div className="text-sm text-zinc-700 font-medium">
                  October 5th, 2025
                </div>
              </div>
              <div className="w-full h-[50] flex items-center gap-3">
                <div>
                  <Avatar className="bg-blue-500 rounded-sm h-6 w-6 overflow-hidden">
                    <AvatarFallback className="bg-blue-600 text-white text-sm ">
                      W
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-sm text-zinc-700 font-medium">
                  Web Design
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
