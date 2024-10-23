import { Droppable } from "@/components/droppable";
import { EmptyElementPlaceholder } from "@/components/empty-element-placeholder";
import { templateMappings } from "@/components/form-elements/template-mappings";
import { useFormBuilder } from "@/components/providers/form-builder";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { generateForm } from "@/lib/code-gen";
import { useForm } from "react-hook-form";

export const FormBuilder = () => {
  const form = useForm();
  const { formElements, clearElements } = useFormBuilder();

  return (
    <Droppable id="root">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() =>
            navigator.clipboard.writeText(generateForm(formElements)),
          )}
        >
          <div className="block h-[80vh] gap-4 overflow-y-auto rounded-lg border border-dashed p-4">
            {formElements.length === 0 && <EmptyElementPlaceholder />}
            {formElements.map((element) => {
              const formElement = templateMappings[element.element];
              return (
                <div key={element.id}>
                  {formElement({
                    name: element.name,
                    label: element.label,
                    description: element.description,
                    extraConfig: element.extraConfig,
                  })}
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex justify-between">
            <Button type="button" variant="secondary" onClick={clearElements}>
              Clear
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </Droppable>
  );
};
