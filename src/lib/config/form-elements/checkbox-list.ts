import { FormElementDetailedConfig } from "./config";

export type CheckboxListFieldsConfig = {
  options: {
    value: string;
    label: string;
  }[];
};

export const checkboxListDetailedConfigDefaults: Partial<CheckboxListFieldsConfig> =
  {
    options: [],
  };

export const checkboxListConfig: FormElementDetailedConfig<CheckboxListFieldsConfig>[] =
  [
    {
      name: "options",
      configFor: "list",
    },
  ] as const;
