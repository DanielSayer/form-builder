import { FormElementDetailedConfig } from "./config";

export type TextAreaExtraFieldsConfig = {
  disabled: boolean;
  maxLength: number;
  minLength: number;
  placeholder: string;
  readOnly: boolean;
};

export const textAreaDetailedConfigDefaults: Partial<TextAreaExtraFieldsConfig> =
  {
    disabled: false,
    maxLength: undefined,
    minLength: undefined,
    placeholder: undefined,
    readOnly: false,
  };

export const textAreaConfig: FormElementDetailedConfig<TextAreaExtraFieldsConfig>[] =
  [
    {
      name: "disabled",
      configFor: "checkbox",
    },
    {
      name: "maxLength",
      configFor: "input",
      type: "number",
      min: 0,
    },
    {
      name: "minLength",
      configFor: "input",
      type: "number",
      min: 0,
    },
    {
      name: "placeholder",
      configFor: "input",
      type: "text",
    },
    {
      name: "readOnly",
      configFor: "checkbox",
    },
  ] as const;
