import { ElementConfig } from "@/lib/element-config";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type ElementEditorProps = {
  onSave: (element: ElementConfig) => void;
  element: ElementConfig;
  onCancel: () => void;
};

const ElementEditor = ({ element, onSave, onCancel }: ElementEditorProps) => {
  const form = useForm<ElementConfig>({
    defaultValues: {
      id: element.id,
      element: element.element,
      label: element.label,
      description: element.description,
    },
  });

  const onSubmit = (data: ElementConfig) => {
    onSave(data);
    onCancel();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The label for your form element.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The description for your form element.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />
        <div className="flex justify-between">
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export { ElementEditor };
