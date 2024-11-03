import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  id: string;
  disabled: boolean;
  placeholder: string;
  value: DateRange;
  onChange: (value: DateRange | undefined) => void;
}

export function DateRangePicker({
  id,
  value,
  disabled,
  placeholder,
  onChange,
}: Partial<DateRangePickerProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
          disabled={disabled}
        >
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "LLL dd, y")} -{" "}
                {format(value.to, "LLL dd, y")}
              </>
            ) : (
              format(value.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value?.from ?? new Date()}
          selected={value}
          onSelect={(date) => {
            if (date) {
              onChange?.({
                from: date.from,
                to: date.to,
              });
            } else {
              onChange?.(undefined);
            }
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

export const EXPORTED_DATE_RANGE_PICKER_CODE = `// @/components/date-range-picker.tsx

import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DateRangePickerProps {
  id: string;
  disabled: boolean;
  placeholder: string;
  value: DateRange;
  onChange: (value: DateRange | undefined) => void;
}

export function DateRangePicker({
  id,
  value,
  disabled,
  placeholder,
  onChange,
}: Partial<DateRangePickerProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
          disabled={disabled}
        >
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "LLL dd, y")} -{" "}
                {format(value.to, "LLL dd, y")}
              </>
            ) : (
              format(value.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value?.from ?? new Date()}
          selected={value}
          onSelect={(date) => {
            if (date) {
              onChange?.({
                from: date.from,
                to: date.to,
              });
            } else {
              onChange?.(undefined);
            }
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
`;
