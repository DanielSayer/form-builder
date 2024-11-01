import { SelectExtraFieldsConfig } from "@/lib/config/form-elements/select";
import { FormElementProps } from "@/lib/element-config";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Select } from "../exported-components/select";

export const SelectFormElement = ({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) => {
  const typedConfig = extraConfig as Partial<SelectExtraFieldsConfig>;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              id={name}
              options={typedConfig.options}
              placeholder={typedConfig.placeholder}
              defaultValue={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export function generateSelectFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = extraConfig as Partial<SelectExtraFieldsConfig>;

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
      from: "@/components/ui/select",
      imports: [
        "Select",
        "SelectContent",
        "SelectItem",
        "SelectTrigger",
        "SelectValue",
      ],
    },
  ];

  const componentCode = `
        <FormField
          name="${name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="${typedConfig.placeholder}" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  ${typedConfig.options
                    ?.map(
                      (option) => `
                  <SelectItem value="${option.value}">
                    ${option.label}
                  </SelectItem>`,
                    )
                    .join("\n")}
                </SelectContent>
              </Select>
              ${description ? `<FormDescription>${description}</FormDescription>` : ``}
              <FormMessage />
            </FormItem>
          )}
        />
  `.trim();

  return { imports, componentCode };
}
