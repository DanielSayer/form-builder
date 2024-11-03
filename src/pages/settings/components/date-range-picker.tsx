import { settings } from "@/lib/settings";
import { useSetting } from "./useSetting";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExternalComponentViewer } from "./external-component-viewer";
import { EXPORTED_DATE_RANGE_PICKER_CODE } from "@/components/exported-components/date-range-picker";

export const DateRangePicker = () => {
  const [dateRangePicker, setDateRangePicker] = useSetting(
    settings.CUSTOM_DATE_RANGE_PICKER,
  );

  return (
    <div className="flex items-center justify-between space-y-0 rounded-md border p-4">
      <div className="flex items-center space-x-3">
        <Checkbox
          id="use-custom-date-range-picker"
          checked={dateRangePicker}
          onCheckedChange={(checked) => setDateRangePicker(!!checked)}
        />
        <Label
          htmlFor="use-custom-date-range-picker"
          className="space-y-1 leading-none"
        >
          <p>Use custom date range picker component</p>
          <p className="font-normal text-muted-foreground">
            An implementation of shadcn/ui's date range picker component using a
            Popover and the Calendar
          </p>
        </Label>
      </div>
      <ExternalComponentViewer
        title="Date Range Picker"
        description="An abstraction on the calendar and popover components"
        componentCode={EXPORTED_DATE_RANGE_PICKER_CODE}
      />
    </div>
  );
};
