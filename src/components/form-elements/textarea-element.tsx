import { spreadExtraConfig } from "@/lib/code-gen";
import { TextAreaExtraFieldsConfig } from "@/lib/config/form-elements/textarea";
import { FormElementProps } from "@/lib/element-config";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

export function TextAreaFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = (extraConfig ?? {}) as TextAreaExtraFieldsConfig;

  return (
    <FormField
      name={name}
      defaultValue=""
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} {...typedConfig} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function generateTextAreaFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  return `
        <FormField
          name="${name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${label}</FormLabel>
              <FormControl>
                <Textarea {...field} ${spreadExtraConfig(extraConfig)} />
              </FormControl>
              ${description ? `<FormDescription>${description}</FormDescription>` : ``}
              <FormMessage />
            </FormItem>
          )}
        />
  `.trim();
}