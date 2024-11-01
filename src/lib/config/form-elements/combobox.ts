import { FormElementDetailedConfig } from "./config";

export type ComboboxExtraFieldsConfig = {
  placeholder: string;
  emptyPlaceholder: string;
  options: {
    value: string;
    label: string;
  }[];
};

export const comboboxDetailedConfigDefaults: Partial<ComboboxExtraFieldsConfig> =
  {
    placeholder: undefined,
    emptyPlaceholder: "No results.",
    options: [],
  };

export const comboboxConfig: FormElementDetailedConfig<ComboboxExtraFieldsConfig>[] =
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
    {
      name: "emptyPlaceholder",
      configFor: "input",
      type: "text",
    },
  ] as const;
