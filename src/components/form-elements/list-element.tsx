import { ListConfig } from "@/lib/config/form-elements/config";
import { FormElementProps } from "@/lib/element-config";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

type FormList<T extends string> = {
  [key in T]: {
    value: string;
    label: string;
  }[];
};

export const ListFormElement = ({
  name,
  label,
  description,
}: FormElementProps & Partial<ListConfig>) => {
  const { control } = useFormContext();
  const { append, remove } = useFieldArray<FormList<typeof name>>({
    name,
    control,
  });

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <div>
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          {field.value?.map((_: unknown, index: number) => (
            <div key={index} className="flex w-full gap-4">
              <FormField
                name={`${name}.${index}.value`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="Value" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name={`${name}.${index}.label`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="Label" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                variant="ghost"
                type="button"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex w-full justify-end">
            <Button
              type="button"
              onClick={() => append({ value: "", label: "" })}
            >
              Add item
            </Button>
          </div>
        </FormItem>
      )}
    />
  );
};
