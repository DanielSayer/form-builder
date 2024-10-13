import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

type DraggableProps = {
  id: string;
  children: React.ReactNode;
};

const Draggable = ({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default Draggable;
