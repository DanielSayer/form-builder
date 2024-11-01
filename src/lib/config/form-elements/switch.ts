import { FormElementDetailedConfig } from "./config";

export type SwitchExtraFieldsConfig = {
  disabled: boolean;
  defaultChecked: boolean;
  required: boolean;
};

export const switchDetailedConfigDefaults: Partial<SwitchExtraFieldsConfig> = {
  disabled: false,
  defaultChecked: false,
  required: false,
};

export const switchConfig: FormElementDetailedConfig<SwitchExtraFieldsConfig>[] =
  [
    {
      name: "disabled",
      configFor: "checkbox",
    },
    {
      name: "defaultChecked",
      configFor: "checkbox",
    },
    {
      name: "required",
      configFor: "checkbox",
    },
  ] as const;
