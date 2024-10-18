import { templateMappings } from "@/components/form-elements/template-mappings";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { inputConfig } from "@/lib/config/form-elements/input";
import { useForm } from "react-hook-form";
import { ElementEditorStandardFields } from "./element-editor-standard-field";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const CustomisePage = () => {
  const form = useForm();
  return (
    <MaxWidthWrapper className="py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl tracking-tight">Want more fields?</h1>
        <Link to="/" className={buttonVariants({ variant: "ghost" })}>
          <ArrowLeft className="me-2 h-4 w-4" />
          Back
        </Link>
      </div>
      <h3>Customise the form by adding more fields.</h3>
      <Separator className="my-4" />
      <Form {...form}>
        <form>
          <h3 className="mb-3 text-xl font-semibold">Standard fields</h3>

          <ElementEditorStandardFields />
          <Separator className="my-4" />
          <h3 className="mb-3 text-xl font-semibold">Extra fields</h3>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {inputConfig.map((config) => {
              const element = templateMappings[config.configFor];
              return (
                <div key={config.name} className="grid items-center">
                  {element({ label: config.name, ...config })}
                </div>
              );
            })}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};
