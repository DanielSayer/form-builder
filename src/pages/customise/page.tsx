import {
  extraConfigMappings,
  templateMappings,
} from "@/components/form-elements/template-mappings";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ElementConfig } from "@/lib/element-config";
import { getElement, updateElement } from "@/server/elements/elements";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ElementEditorStandardFields } from "./element-editor-standard-field";
import useDetailedConfigForm, {
  stripExtraConfig,
} from "./useDetailedConfigForm";

export const CustomisePage = () => {
  const { elementId } = useParams();
  const element = getElement(elementId);
  const form = useDetailedConfigForm(element);

  const onSubmit = (data: ElementConfig) => {
    const newExtraConfig = stripExtraConfig(element.element, data.extraConfig);
    updateElement({ ...data, extraConfig: newExtraConfig });
    toast.success("Element updated!");
  };

  const onCancel = () => {
    form.reset();
  };

  return (
    <MaxWidthWrapper className="py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">
          You need more fields?
        </h1>
        <Link to="/" className={buttonVariants({ variant: "ghost" })}>
          <ArrowLeft className="me-2 h-4 w-4" />
          Back
        </Link>
      </div>
      <h3 className="tracking-tight text-muted-foreground">
        Don&apos;t worry, we got you!
      </h3>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h3 className="mb-3 text-xl font-semibold">Standard fields</h3>

          <ElementEditorStandardFields />
          <Separator className="my-4" />
          <h3 className="mb-3 text-xl font-semibold">Extra fields</h3>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {extraConfigMappings[element.element].map(
              ({ name, configFor, ...config }) => {
                const element = templateMappings[configFor];
                return (
                  <div key={name} className="grid items-center">
                    {element({
                      label: name,
                      name: `extraConfig.${name}`,
                      description: "",
                      ...config,
                    })}
                  </div>
                );
              },
            )}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};
