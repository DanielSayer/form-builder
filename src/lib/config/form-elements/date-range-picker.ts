import { FormElementDetailedConfig } from "./config";

export type DateRangePickerExtraFieldsConfig = {
  disabled: boolean;
  placeholder: string;
};

export const dateRangePickerDetailedConfigDefaults: Partial<DateRangePickerExtraFieldsConfig> =
  {
    disabled: false,
    placeholder: "Pick a date",
  };

export const dateRangePickerConfig: FormElementDetailedConfig<DateRangePickerExtraFieldsConfig>[] =
  [
    {
      name: "disabled",
      configFor: "checkbox",
    },
    {
      name: "placeholder",
      configFor: "input",
      type: "text",
    },
  ] as const;
