import { RadioGroupExtraFieldsConfig } from "@/lib/config/form-elements/radio-group";
import { FormElementProps } from "@/lib/element-config";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function RadioGroupFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = extraConfig as Partial<RadioGroupExtraFieldsConfig>;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <div>
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {typedConfig.options?.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function generateRadioGroupFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = extraConfig as Partial<RadioGroupExtraFieldsConfig>;

  const hoistedVariables = [
    `const ${name}Options = ${JSON.stringify(typedConfig.options ?? [], null, 2)}`,
  ];

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
      from: "@/components/ui/radio-group",
      imports: ["RadioGroup", "RadioGroupItem"],
    },
  ];

  const componentCode = `
        <FormField
          name="${name}"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div>
                <FormLabel>${label}</FormLabel>
                ${description ? `<FormDescription>${description}</FormDescription>` : ``}
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {${name}Options.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="font-normal">{option.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  `.trim();

  return { imports, hoistedVariables, componentCode };
}
