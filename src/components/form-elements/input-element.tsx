import { spreadExtraConfig } from "@/lib/code-gen";
import { InputExtraFieldsConfig } from "@/lib/config/form-elements/input";
import { FormElementProps } from "@/lib/element-config";
import { parseValue } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export function InputFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = (extraConfig ?? {}) as InputExtraFieldsConfig;

  return (
    <FormField
      name={name}
      defaultValue=""
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              onChange={(e) =>
                onChange(parseValue(e.target.value, typedConfig.type ?? "text"))
              }
              {...field}
              {...typedConfig}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function generateInputFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const imports = [
    {
      from: "@/components/ui/form",
      imports: [
        "FormControl",
        description ? "FormDescription" : "",
        "FormField",
        "FormItem",
        "FormLabel",
        "FormMessage",
      ],
    },
    {
      from: "@/components/ui/input",
      imports: ["Input"],
    },
  ];

  const componentCode = `
        <FormField
          name="${name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${label}</FormLabel>
              <FormControl>
                <Input {...field} ${spreadExtraConfig(extraConfig)} />
              </FormControl>
              ${description ? `<FormDescription>${description}</FormDescription>` : ``}
              <FormMessage />
            </FormItem>
          )}
        />
  `.trim();

  return { imports, componentCode };
}
