import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExternalComponentViewer } from "./external-component-viewer";
import { EXPORTED_DATE_PICKER_CODE } from "@/components/exported-components/date-picker";
import { useSetting } from "./useSetting";
import { settings } from "@/lib/settings";

export const DatePicker = () => {
  const [datePicker, setDatePicker] = useSetting(settings.CUSTOM_DATE_PICKER);

  return (
    <div className="flex items-center justify-between space-y-0 rounded-md border p-4">
      <div className="flex items-center space-x-3">
        <Checkbox
          id="use-custom-date-picker"
          checked={datePicker}
          onCheckedChange={(checked) => setDatePicker(!!checked)}
        />
        <Label
          htmlFor="use-custom-date-picker"
          className="space-y-1 leading-none"
        >
          <p>Use custom date picker component</p>
          <p className="font-normal text-muted-foreground">
            An implementation of shadcn/ui's date picker component using a
            Popover and the Calendar
          </p>
        </Label>
      </div>
      <ExternalComponentViewer
        title="Date Picker"
        description="An abstraction on the calendar and popover components"
        componentCode={EXPORTED_DATE_PICKER_CODE}
      />
    </div>
  );
};
