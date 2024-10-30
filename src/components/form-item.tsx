import { ElementConfig } from "@/lib/element-config";
import { templateMappings } from "./form-elements/template-mappings";
import { SortableItem } from "./sortable-item";
import { Button, buttonVariants } from "./ui/button";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

type FormItemProps = {
  element: ElementConfig;
  removeElement: (id: string) => void;
};

export const FormItem = ({ element, removeElement }: FormItemProps) => {
  const FormElement = templateMappings[element.element];
  const elementId = element.id;

  if (!elementId) {
    return null;
  }

  return (
    <SortableItem id={elementId}>
      <div className="flex items-center gap-2">
        <div className="w-full">
          <FormElement {...element} />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full"
            title="Delete"
            onClick={() => removeElement(elementId)}
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Link
            to={`/customise/${elementId}`}
            className={buttonVariants({
              className: "!rounded-full",
              variant: "ghost",
              size: "icon",
            })}
          >
            <Pencil className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SortableItem>
  );
};
