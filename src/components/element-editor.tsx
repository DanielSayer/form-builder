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
import { Checkbox } from "./ui/checkbox";
import { toCamelCase } from "@/lib/utils";

type ElementEditorProps = {
  onSave: (element: ElementConfig) => void;
  element: ElementConfig;
  onCancel: () => void;
};

type ElementEditorForm = ElementConfig & { useLabelAsName: boolean };

const ElementEditor = ({ element, onSave, onCancel }: ElementEditorProps) => {
  const form = useForm<ElementEditorForm>({
    defaultValues: {
      id: element.id,
      element: element.element,
      label: element.label,
      name: element.label.toLowerCase().replace(" ", ""),
      description: element.description,
      useLabelAsName: true,
    },
  });

  const onSubmit = (data: ElementEditorForm) => {
    const name = data.useLabelAsName ? toCamelCase(data.label) : data.name;
    onSave({ ...data, name });
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
          name="useLabelAsName"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">
                Use Label as Element Name
              </FormLabel>
            </FormItem>
          )}
        />

        {!form.watch("useLabelAsName") && (
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Element Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The prop name in your form schema.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
