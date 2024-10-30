import { ElementConfig } from "@/lib/element-config";
import { Ghost } from "lucide-react";
import { templateMappings } from "./form-elements/template-mappings";
import { Button } from "./ui/button";
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
import { Separator } from "./ui/separator";

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
        {elements.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-10 text-center text-muted-foreground">
            <Ghost />
            <div>
              <div>Nothing to preview yet.</div>
              <div>Add some elements to your form.</div>
            </div>
          </div>
        )}
        {elements.map((element) => {
          const FormElement = templateMappings[element.element];
          return (
            <div key={element.id}>
              <div className="w-full">
                <FormElement {...element} />
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
