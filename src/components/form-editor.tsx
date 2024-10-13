import { ElementConfig } from "@/lib/element-config";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ElementEditor } from "./element-editor";
import { FormSummary } from "./form-summary";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useFormBuilder } from "./providers/form-builder";

type FormElementEditorProps = {
  config: ElementConfig[];
};

const FormEditor = ({ config }: FormElementEditorProps) => {
  const { appendElement } = useFormBuilder();
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
              onSave={appendElement}
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
