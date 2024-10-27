import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export const ElementEditorStandardFields = () => {
  const { watch } = useFormContext();

  const isUsingLabelAsName = watch("isUsingLabelAsName");
  return (
    <div className="space-y-4">
      <FormField
        name="label"
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between">
              <FormLabel>Label</FormLabel>
              <FormField
                name="isUsingLabelAsName"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Use Label as Element Name
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {!isUsingLabelAsName && (
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Element Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          name="description"
          render={({ field }) => (
            <FormItem className={cn({ "col-span-2": isUsingLabelAsName })}>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
