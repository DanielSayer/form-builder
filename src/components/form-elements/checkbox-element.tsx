import { FormElementProps } from "@/lib/element-config";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CheckboxExtraFieldsConfig } from "@/lib/config/form-elements/checkbox";
import { spreadExtraConfig } from "@/lib/code-gen";

export const CheckboxFormElement = ({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) => {
  const typedConfig = extraConfig as Partial<CheckboxExtraFieldsConfig>;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...typedConfig}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export function generateCheckboxFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  return `
        <FormField
          name="${name}"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} ${spreadExtraConfig(extraConfig)} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>${label}</FormLabel>
                ${description ? `<FormDescription>${description}</FormDescription>` : ``}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
`.trim();
}
