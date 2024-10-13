import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { AddElementDialog } from "./components/add-element-dialog";
import Draggable from "./components/draggable";
import { Droppable } from "./components/droppable";
import { EmptyElementPlaceholder } from "./components/empty-element-placeholder";
import { FormEditor } from "./components/form-editor";
import { InputElementDisplay } from "./components/form-elements/input-element";
import { templateMappings } from "./components/form-elements/template-mappings";
import { useFormBuilder } from "./components/providers/form-builder";
import { ElementConfig, FormElement } from "./lib/element-config";
import { useForm } from "react-hook-form";
import { Form } from "./components/ui/form";

type FormElementDisplay = {
  id: FormElement;
  render: () => JSX.Element;
};

const elements: FormElementDisplay[] = [
  { id: "input", render: InputElementDisplay },
];

function App() {
  const form = useForm();
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

    const newConfig: ElementConfig = {
      id: crypto.randomUUID(),
      element: element.id,
      description: "",
      label: "",
    };
    setSelectedElement(newConfig);
    toggle();
  };

  return (
    <div className="flex min-h-screen w-full p-3">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="h-100 w-1/2 rounded-lg border border-dashed p-3">
          <Droppable id="root">
            <Form {...form}>
              {formElements.length === 0 && <EmptyElementPlaceholder />}
              {formElements.map((element) => {
                const formElement = templateMappings[element.element];
                return formElement({ element });
              })}
            </Form>
          </Droppable>
        </div>
        <div className="w-1/2 p-3">
          <h1>Components</h1>
          <div className="grid grid-cols-2 gap-4">
            {elements.map((element) => (
              <Draggable key={element.id} id={element.id}>
                {element.render()}
              </Draggable>
            ))}
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
}

export default App;
