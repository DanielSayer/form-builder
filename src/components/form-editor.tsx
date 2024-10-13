import { ElementConfig } from "@/lib/element-config";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ElementEditor } from "./element-editor";
import { FormSummary } from "./form-summary";
import { useFormBuilder } from "./providers/form-builder";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

type FormElementEditorProps = {
  config: ElementConfig[];
};

const FormEditor = ({ config }: FormElementEditorProps) => {
  const { updateElement } = useFormBuilder();
  const [selectedElement, setSelectedElement] = useState<ElementConfig | null>(
    null,
  );

  const goToSummaryView = () => setSelectedElement(null);

  const selectElement = (element: ElementConfig) => {
    setSelectedElement(element);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <ChevronRight className="absolute right-4 top-1/2" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Form</SheetTitle>
          <SheetDescription>Configure your form elements.</SheetDescription>
          <Separator />
        </SheetHeader>
        <div className="h-full py-3">
          {selectedElement ? (
            <ElementEditor
              onSave={updateElement}
              element={selectedElement}
              onCancel={goToSummaryView}
            />
          ) : (
            <FormSummary config={config} selectElement={selectElement} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { FormEditor };
