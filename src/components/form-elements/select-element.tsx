import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SelectConfig } from "@/lib/config/form-elements/config";
import { FormElementProps } from "@/lib/element-config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const SelectFormElement = ({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) => {
  const typedConfig = extraConfig as Partial<SelectConfig>;

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
