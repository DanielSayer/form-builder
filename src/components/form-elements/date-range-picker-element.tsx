import { DateRangePickerExtraFieldsConfig } from "@/lib/config/form-elements/date-range-picker";
import { FormElementProps } from "@/lib/element-config";
import { DateRangePicker } from "../exported-components/date-range-picker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { getSetting } from "@/server/settings/settings";
import { settings } from "@/lib/settings";

export function DateRangePickerFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = (extraConfig ?? {}) as DateRangePickerExtraFieldsConfig;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DateRangePicker
              id={name}
              value={field.value}
              onChange={field.onChange}
              placeholder={typedConfig.placeholder}
              disabled={typedConfig.disabled}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function generateDateRangePickerFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const isEnabled = getSetting(settings.CUSTOM_DATE_RANGE_PICKER);
  const typedConfig = (extraConfig ?? {}) as DateRangePickerExtraFieldsConfig;

  if (isEnabled) {
    const imports = [
      {
        from: "@/components/ui/form",
        imports: [
          "FormControl",
          description ? "FormDescription" : "",
          "FormField",
          "FormItem",
          "FormLabel",
          "FormMessage",
        ],
      },
      {
        from: "@/components/date-range-picker",
        imports: ["DateRangePicker"],
      },
    ];

    const componentCode = `
<FormField
            name="${name}"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>${label}</FormLabel>
                <DateRangePicker
                  id={name}
                  value={field.value}
                  ${typedConfig.placeholder ? `placeholder="${typedConfig.placeholder}"` : ``}
                  ${typedConfig.disabled ? `disabled` : ``}
                  onChange={field.onChange}
                />
                ${description ? `<FormDescription>${description}</FormDescription>` : ``}
                <FormMessage />
              </FormItem>
            )}
          />
    `;

    return { imports, componentCode };
  }

  const imports = [
    {
      from: "@/components/ui/form",
      imports: [
        "FormControl",
        description ? "FormDescription" : "",
        "FormField",
        "FormItem",
        "FormLabel",
        "FormMessage",
      ],
    },
    {
      from: "@/components/ui/popover",
      imports: ["Popover", "PopoverContent", "PopoverTrigger"],
    },
    {
      from: "@/components/ui/button",
      imports: ["Button"],
    },
    {
      from: "@/components/ui/calendar",
      imports: ["Calendar"],
    },
    {
      from: "date-fns",
      imports: ["format"],
    },
    {
      from: "lucide-react",
      imports: ["CalendarIcon"],
    },
    {
      from: "@/lib/utils",
      imports: ["cn"],
    },
  ];

  const componentCode = `
        <FormField
          name="${name}"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>${label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                      ${typedConfig.disabled ? `disabled` : ``}
                    >
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>${typedConfig.placeholder ? `${typedConfig.placeholder}` : ``}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from ?? new Date()}
                    selected={field.value}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange({
                          from: date.from,
                          to: date.to,
                        });
                      } else {
                        field.onChange(undefined);
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              ${description ? `<FormDescription>${description}</FormDescription>` : ``}
              <FormMessage />
            </FormItem>
          )}
        />
  `.trim();

  return { imports, componentCode };
}
