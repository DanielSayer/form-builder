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
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { toCamelCase } from "@/lib/utils";
import {
  ElementEditorFormData,
  elementEditorSchema,
} from "@/lib/schemas/element-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type ElementEditorProps = {
  onSave: (element: ElementConfig) => void;
  element: ElementConfig;
  onCancel: () => void;
};

const ElementEditor = ({ element, onSave, onCancel }: ElementEditorProps) => {
  const form = useForm<ElementEditorFormData>({
    defaultValues: { ...element, useLabelAsName: element.isUsingLabelAsName },
    resolver: zodResolver(elementEditorSchema),
  });

  const onSubmit = (data: ElementEditorFormData) => {
    const name = data.useLabelAsName ? toCamelCase(data.label) : data.name!;
    onSave({
      id: element.id,
      name,
      label: data.label,
      element: element.element,
      description: data.description ?? "",
      isUsingLabelAsName: data.useLabelAsName,
    });
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
              <div className="flex justify-between">
                <FormLabel>Label</FormLabel>
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
              </div>
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
                The description for your form element. Like this one!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          to={`/customise/${element.id}`}
          className={buttonVariants({ variant: "ghost" })}
        >
          I want more fields
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
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
