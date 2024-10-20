import { ElementEditor } from "./element-editor";
import { useFormBuilder } from "./providers/form-builder";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ElementConfig } from "@/lib/element-config";

type AddElementDialogProps = {
  selectedElement: ElementConfig | null;
  isOpen: boolean;
  toggle: () => void;
  clearElement: () => void;
};

const AddElementDialog = ({
  selectedElement,
  isOpen,
  toggle,
  clearElement,
}: AddElementDialogProps) => {
  const { appendElement } = useFormBuilder();

  const onCreate = (element: ElementConfig) => {
    if (element.id) {
      throw new Error("Element already exists");
    }
    appendElement({ ...element, id: crypto.randomUUID() });
    toggle();
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      clearElement();
    }

    toggle();
  };

  const onCancel = () => {
    clearElement();
    toggle();
  };

  if (!selectedElement) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Element</DialogTitle>
          <DialogDescription>
            Add and quickly configure your new element to your form.
          </DialogDescription>
        </DialogHeader>
        <ElementEditor
          onSave={onCreate}
          onCancel={onCancel}
          element={selectedElement}
        />
      </DialogContent>
    </Dialog>
  );
};

export { AddElementDialog };
