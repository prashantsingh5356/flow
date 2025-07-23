"use client";

import { useState } from "react";
import TaskColumn from "./TaskColumn";

import { DragDropContext } from "@hello-pangea/dnd";

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type Task = {
  [key: string]: {
    id: string;
    content: string;
  };
};

const KANBAN_DATA: {
  tasks: Task;
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
} = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out garbage" },
    "task-2": { id: "task-2", content: "Take a garbage" },
    "task-3": { id: "task-3", content: "Take no garbage" },
    "task-4": { id: "task-4", content: "Garbage" },
    "task-5": { id: "task-5", content: "Review UI" },
    "task-6": { id: "task-6", content: "Review CI/CD" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Todo",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "Working",
      taskIds: ["task-3", "task-4"],
    },
    "column-3": {
      id: "column-3",
      title: "Review",
      taskIds: ["task-5", "task-6"],
    },
  },

  // Reordering of columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

const TaskKanban = () => {
  const [kanbanData, setKanbanData] = useState(KANBAN_DATA);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Ordering task in same column
    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      const column = kanbanData.columns[source.droppableId];
      const newTaskArray = Array.from(column?.taskIds ?? []);
      newTaskArray.splice(source.index, 1);
      newTaskArray.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskArray,
      };

      setKanbanData((prev: any) => {
        return {
          ...prev,
          columns: {
            ...prev.columns,
            [newColumn?.id ?? ""]: newColumn,
          },
        };
      });
    }

    // Ordering task in different column
    if (destination.droppableId !== source.droppableId) {
      const sourceColumn = kanbanData.columns[source.droppableId];
      const destinationColumn = kanbanData.columns[destination.droppableId];

      if (
        destination.index === source.index ||
        destination.index !== source.index
      ) {
        const sourceColumnTask = Array.from(sourceColumn?.taskIds ?? []);
        const destinationColumnTask = Array.from(
          destinationColumn?.taskIds ?? []
        );

        sourceColumnTask.splice(source.index, 1);
        destinationColumnTask.splice(destination.index, 0, draggableId);

        const newSourceColumn = {
          ...sourceColumn,
          taskIds: sourceColumnTask,
        };

        const newDestinationColumn = {
          ...destinationColumn,
          taskIds: destinationColumnTask,
        };

        setKanbanData((prev: any) => {
          return {
            ...prev,
            columns: {
              ...prev.columns,
              [newSourceColumn?.id ?? ""]: newSourceColumn,
              [newDestinationColumn?.id ?? ""]: newDestinationColumn,
            },
          };
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full min-h-[65vh] flex gap-5">
        {kanbanData.columnOrder.map((columnId: string) => {
          const column = kanbanData.columns[columnId];
          const tasks = column?.taskIds.map((taskId) => {
            return kanbanData?.tasks[taskId] !== undefined
              ? kanbanData.tasks[taskId]
              : { id: "", content: "" };
          });

          return <TaskColumn key={column?.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default TaskKanban;
