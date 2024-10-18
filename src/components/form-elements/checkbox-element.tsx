import { CheckboxConfig } from "@/lib/config/form-elements/config";
import { FormElementProps } from "@/lib/element-config";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

export const CheckboxFormElement = ({
  name,
  label,
}: FormElementProps & Partial<CheckboxConfig>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox {...field} />
          </FormControl>
          <FormLabel>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
};
