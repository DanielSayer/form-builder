import { FormElementDetailedConfig } from "./config";

export type CheckboxExtraFieldsConfig = {
  disabled: boolean;
  defaultChecked: boolean;
  required: boolean;
};

export const checkboxDetailedConfigDefaults: Partial<CheckboxExtraFieldsConfig> =
  {
    disabled: false,
    defaultChecked: false,
    required: false,
  };

export const checkboxConfig: FormElementDetailedConfig<CheckboxExtraFieldsConfig>[] =
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
