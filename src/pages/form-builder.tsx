import { Droppable } from "@/components/droppable";
import { EmptyElementPlaceholder } from "@/components/empty-element-placeholder";
import { templateMappings } from "@/components/form-elements/template-mappings";
import { useFormBuilder } from "@/components/providers/form-builder";
import { SortableItem } from "@/components/sortable-item";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { generateForm } from "@/lib/code-gen";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const FormBuilder = () => {
  const form = useForm();
  const { formElements, clearElements, updateElements } = useFormBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id !== over.id) {
      const configIds = formElements.map((x) => x.id);
      const oldIndex = configIds.indexOf(`${active.id}`);
      const newIndex = configIds.indexOf(`${over.id}`);
      updateElements(arrayMove(formElements, oldIndex, newIndex));
    }
  };

  return (
    <Droppable id="root">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() =>
            navigator.clipboard.writeText(generateForm(formElements)),
          )}
        >
          <div className="block min-h-[80vh] gap-4 overflow-hidden rounded-lg border border-dashed p-4">
            {formElements.length === 0 && <EmptyElementPlaceholder />}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={formElements.map((x, i) => x.id ?? i)}
                strategy={verticalListSortingStrategy}
              >
                {formElements.map((element, i) => {
                  const formElement = templateMappings[element.element];
                  return (
                    <SortableItem key={element.id} id={element.id ?? `${i}`}>
                      <div key={element.id} className="flex items-center gap-2">
                        <div className="w-full">
                          {formElement({
                            name: element.name,
                            label: element.label,
                            description: element.description,
                            extraConfig: element.extraConfig,
                          })}
                        </div>
                        <Link
                          to={`/customise/${element.id}`}
                          className={buttonVariants({
                            className: "!rounded-full",
                            variant: "ghost",
                            size: "icon",
                          })}
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </div>
                    </SortableItem>
                  );
                })}
              </SortableContext>
            </DndContext>
          </div>
          <div className="mt-3 flex justify-between">
            <Button type="button" variant="secondary" onClick={clearElements}>
              Clear
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </Droppable>
  );
};
