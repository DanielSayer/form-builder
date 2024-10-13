import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

type DroppableProps = {
  id: string;
  children: ReactNode;
};

export const Droppable = ({ id, children }: DroppableProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="h-full w-full">
      {children}
    </div>
  );
};
