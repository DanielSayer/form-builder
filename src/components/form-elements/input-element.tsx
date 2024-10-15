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

export const InputElementDisplay = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
        <CardDescription>This is a basic input element.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input />
      </CardContent>
    </Card>
  );
};

export const InputFormElement = ({ element }: FormElementProps) => {
  return (
    <FormField
      name={element.label}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{element.label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>{element.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const generateInputFormElement = ({ element }: FormElementProps) => {
  return `
    <FormField
      name="${element.label}"
      render={({ field }) => (
        <FormItem>
          <FormLabel>${element.label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          ${element.description && `<FormDescription>${element.description}</FormDescription>`}
          <FormMessage />
        </FormItem>
      )}
    />
  `.trim();
};
