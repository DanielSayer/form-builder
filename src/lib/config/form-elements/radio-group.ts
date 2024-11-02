import { FormElementDetailedConfig } from "./config";

export type RadioGroupExtraFieldsConfig = {
  options: {
    value: string;
    label: string;
  }[];
};

export const radioGroupDetailedConfigDefaults: Partial<RadioGroupExtraFieldsConfig> =
  {
    options: [],
  };

export const radioGroupConfig: FormElementDetailedConfig<RadioGroupExtraFieldsConfig>[] =
  [
    {
      name: "options",
      configFor: "list",
    },
  ] as const;
