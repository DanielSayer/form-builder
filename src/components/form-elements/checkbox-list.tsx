import { CheckboxListFieldsConfig } from "@/lib/config/form-elements/checkbox-list";
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

export const CheckboxListFormElement = ({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) => {
  const typedConfig = extraConfig as Partial<CheckboxListFieldsConfig>;

  return (
    <FormField
      name={name}
      defaultValue={[]}
      render={() => (
        <FormItem className="mb-2">
          <div className="mb-3">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          {typedConfig.options?.map((item) => (
            <FormField
              key={item.value}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.value}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.value,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export function generateCheckboxListFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = extraConfig as Partial<CheckboxListFieldsConfig>;

  const hoistedVariables = [
    `const ${name}Options = ${JSON.stringify(typedConfig.options ?? [], null, 2)}`,
  ];

  const componentCode = `
        <FormField
          name="${name}"
          defaultValue={[]}
          render={() => (
            <FormItem>
              <div className="mb-3">
                <FormLabel>${label}</FormLabel>
                ${description ? `<FormDescription>${description}</FormDescription>` : ``}
              </div>
              {${name}Options?.map((item) => (
                <FormField
                  key={item.value}
                  name="${name}"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.value,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
  `.trim();

  return { hoistedVariables, componentCode };
}
