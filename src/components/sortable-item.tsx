import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { GripVertical } from "lucide-react";

type SortableItemProps = {
  id: string;
  children: ReactNode;
};

export const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </Button>
      <div className="w-full">{children}</div>
    </div>
  );
};
