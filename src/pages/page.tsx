import { AddElementDialog } from "@/components/add-element-dialog";
import { Display } from "@/components/display";
import Draggable from "@/components/draggable";
import { FormEditor } from "@/components/form-editor";
import { useFormBuilder } from "@/components/providers/form-builder";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { displayElements } from "@/lib/config/presets-config";
import { ElementConfig, defaultElementConfig } from "@/lib/element-config";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { FormBuilder } from "./form-builder";

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

    const element = displayElements.find((x) => x.id === active.id);
    if (!element) {
      return;
    }

    const myElement = defaultElementConfig(
      element.formElement,
      element.defaults,
    );
    setSelectedElement(myElement);
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
          <Card>
            <CardHeader>
              <CardTitle>Elements</CardTitle>
              <CardDescription>
                Drag and drop elements to build your form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {displayElements.map((element) => (
                  <Draggable key={element.id} id={element.id}>
                    <Display {...element} />
                  </Draggable>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <DragOverlay dropAnimation={null}>
          <Display
            {...displayElements.find((element) => element.id === activeId)!}
          />
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
