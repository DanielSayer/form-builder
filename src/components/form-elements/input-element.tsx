import { FormElementProps } from "@/lib/element-config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { spreadExtraConfig } from "@/lib/code-gen";
import { InputExtraFieldsConfig } from "@/lib/config/form-elements/input";

export const InputElementDisplay = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
        <CardDescription>This is a basic input element.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input id="input" />
      </CardContent>
    </Card>
  );
};

export function InputFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = extraConfig as InputExtraFieldsConfig;

  return (
    <FormField
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              onChange={(e) => {
                const val =
                  typedConfig.type === "number"
                    ? e.target.valueAsNumber
                    : e.target.value;

                onChange(val);
              }}
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
  return `
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
}
