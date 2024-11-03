import { Separator } from "@/components/ui/separator";
import { Select } from "./select";
import { Combobox } from "./combobox";
import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./date-range-picker";

export function ComponentsPage() {
  return (
    <div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Components</h3>
        <p className="text-muted-foreground">
          Out of the box, the form builder will export code for{" "}
          <code>shadcn/ui</code> components. If you wish to use your own
          components, you can do so here.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="space-y-4">
        <Select />
        <Combobox />
        <DatePicker />
        <DateRangePicker />
      </div>
    </div>
  );
}
