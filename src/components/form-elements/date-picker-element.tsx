import { DatePickerExtraFieldsConfig } from "@/lib/config/form-elements/date-picker";
import { FormElementProps } from "@/lib/element-config";
import { DatePicker } from "../exported-components/date-picker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { settings } from "@/lib/settings";
import { getSetting } from "@/server/settings/settings";

export function DatePickerFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = (extraConfig ?? {}) as DatePickerExtraFieldsConfig;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DatePicker
              id={name}
              value={field.value}
              placeholder={typedConfig.placeholder}
              disabled={typedConfig.disabled}
              onChange={field.onChange}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function generateDatePickerFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const isEnabled = getSetting(settings.CUSTOM_DATE_PICKER);
  const typedConfig = (extraConfig ?? {}) as DatePickerExtraFieldsConfig;

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
        from: "@/components/date-picker",
        imports: ["DatePicker"],
      },
    ];

    const componentCode = `
<FormField
            name="${name}"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>${label}</FormLabel>
                <DatePicker
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
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                      ${typedConfig.disabled ? `disabled` : ``}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>${typedConfig.placeholder ? `${typedConfig.placeholder}` : ``}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
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
