import { FormElementDetailedConfig } from "./config";

export type DatePickerExtraFieldsConfig = {
  disabled: boolean;
  placeholder: string;
};

export const datePickerDetailedConfigDefaults: Partial<DatePickerExtraFieldsConfig> =
  {
    disabled: false,
    placeholder: "Pick a date",
  };

export const datePickerConfig: FormElementDetailedConfig<DatePickerExtraFieldsConfig>[] =
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
