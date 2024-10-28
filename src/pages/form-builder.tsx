import { Droppable } from "@/components/droppable";
import { EmptyElementPlaceholder } from "@/components/empty-element-placeholder";
import { FormItem } from "@/components/form-item";
import { Preview } from "@/components/preview";
import { useFormBuilder } from "@/components/providers/form-builder";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";

export const FormBuilder = () => {
  const form = useForm();
  const { formElements, clearElements, updateElements, removeElement } =
    useFormBuilder();

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
          <div className="block min-h-[80vh] space-y-2 overflow-hidden rounded-lg border border-dashed p-4">
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
                {formElements.map((element) => (
                  <FormItem
                    key={element.id}
                    element={element}
                    removeElement={removeElement}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
          <div className="mt-3 flex justify-between">
            <Button type="button" variant="secondary" onClick={clearElements}>
              Clear
            </Button>
            <div className="flex gap-4">
              <Preview elements={formElements} />
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </Droppable>
  );
};
