import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ElementConfig } from "@/lib/element-config";
import { templateMappings } from "./form-elements/template-mappings";

type PreviewProps = {
  elements: ElementConfig[];
};

export const Preview = ({ elements }: PreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Preview</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preview Your Form</DialogTitle>
          <DialogDescription>
            Here is your form with none of the extra stuff.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {elements.map((element) => {
          const formElement = templateMappings[element.element];
          return (
            <div key={element.id}>
              <div className="w-full">
                {formElement({
                  name: element.name,
                  label: element.label,
                  description: element.description,
                  extraConfig: element.extraConfig,
                })}
              </div>
            </div>
          );
        })}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
