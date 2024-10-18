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
import { InputConfig } from "@/lib/config/form-elements/config";

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

export const InputFormElement = ({
  name,
  label,
  description,
  min,
  type,
}: FormElementProps & Partial<InputConfig>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} min={min} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const generateInputFormElement = ({
  name,
  label,
  description,
}: FormElementProps) => {
  return `
        <FormField
          name="${name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${label}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              ${description && `<FormDescription>${description}</FormDescription>`}
              <FormMessage />
            </FormItem>
          )}
        />
  `.trim();
};
