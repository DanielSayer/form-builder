import { FormElementProps } from "@/lib/element-config";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { SwitchExtraFieldsConfig } from "@/lib/config/form-elements/switch";
import { spreadExtraConfig } from "@/lib/code-gen/utils";

export function SwitchFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = extraConfig as Partial<SwitchExtraFieldsConfig>;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between p-4">
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              {...typedConfig}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function generateSwitchFormElement({
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
      ],
    },
    {
      from: "@/components/ui/switch",
      imports: ["Switch"],
    },
  ];

  const componentCode = `
        <FormField
          name="${name}"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4">
              <div className="space-y-0.5">
                <FormLabel>${label}</FormLabel>
                ${description ? `<FormDescription>${description}</FormDescription>` : ``}
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} ${spreadExtraConfig(extraConfig)} />
              </FormControl>
            </FormItem>
          )}
        />
`.trim();

  return { imports, componentCode };
}
