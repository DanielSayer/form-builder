import { AddElementDialog } from "@/components/add-element-dialog";
import Draggable from "@/components/draggable";
import { FormEditor } from "@/components/form-editor";
import { InputElementDisplay } from "@/components/form-elements/input-element";
import { useFormBuilder } from "@/components/providers/form-builder";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ElementConfig,
  FormElement,
  defaultElementConfig,
} from "@/lib/element-config";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { FormBuilder } from "./form-builder";

type FormElementDisplay = {
  id: FormElement;
  render: () => JSX.Element;
};

const elements: FormElementDisplay[] = [
  { id: "input", render: InputElementDisplay },
];

export const FormBuilderPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { formElements } = useFormBuilder();
  const [selectedElement, setSelectedElement] = useState<ElementConfig | null>(
    null,
  );

  const toggle = () => setIsOpen((prev) => !prev);
  const clearElement = () => setSelectedElement(null);

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      return;
    }

    const element = elements.find((x) => x.id === active.id);
    if (!element) {
      return;
    }

    setSelectedElement(defaultElementConfig(element.id));
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen p-4">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Form Builder</CardTitle>
              <CardDescription>
                Drag and drop elements to build your form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormBuilder />
            </CardContent>
          </Card>
          <div>
            <div className="grid grid-cols-2 gap-4">
              {elements.map((element) => (
                <Draggable key={element.id} id={element.id}>
                  {element.render()}
                </Draggable>
              ))}
            </div>
          </div>
        </div>
        <DragOverlay dropAnimation={null}>
          {elements.find((element) => element.id === activeId)?.render()}
        </DragOverlay>
      </DndContext>
      <FormEditor config={formElements} />
      <AddElementDialog
        isOpen={isOpen}
        toggle={toggle}
        clearElement={clearElement}
        selectedElement={selectedElement}
      />
    </div>
  );
};
