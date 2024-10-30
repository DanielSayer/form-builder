import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormElementProps } from "@/lib/element-config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectExtraFieldsConfig } from "@/lib/config/form-elements/select";

type SelectDisplayElementProps = {
  id: string;
  placeholder?: string;
  options?: {
    value: string;
    label: string;
  }[];
};

export const SelectDisplayElement = ({
  id,
  options,
  placeholder,
}: SelectDisplayElementProps) => {
  return (
    <Select>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

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
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={typedConfig.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {typedConfig.options?.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

  return { componentCode };
}
