import { FormElementDetailedConfig } from "./config";

export type SelectExtraFieldsConfig = {
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
};

export const selectDetailedConfigDefaults: Partial<SelectExtraFieldsConfig> = {
  placeholder: undefined,
  options: [],
};

export const selectConfig: FormElementDetailedConfig<SelectExtraFieldsConfig>[] =
  [
    {
      name: "options",
      configFor: "list",
    },
    {
      name: "placeholder",
      configFor: "input",
      type: "text",
    },
  ] as const;
