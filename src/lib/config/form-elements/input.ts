import { FormElementDetailedConfig } from "./config";

export type InputExtraFieldsConfig = {
  type: "number" | "text" | "email" | "password" | "date" | "time";
  disabled: boolean;
  max: number;
  maxLength: number;
  min: number;
  minLength: number;
  placeholder: string;
  readonly: boolean;
  step: string;
};

export const inputDetailedConfigDefaults: Partial<InputExtraFieldsConfig> = {
  disabled: false,
  max: undefined,
  maxLength: undefined,
  min: undefined,
  minLength: undefined,
  placeholder: undefined,
  readonly: false,
  step: undefined,
  type: "text",
};

export const inputConfig: FormElementDetailedConfig<InputExtraFieldsConfig>[] =
  [
    {
      name: "type",
      configFor: "select",
      placeholder: "Select input type",
      options: [
        {
          value: "text",
          label: "text",
        },
        {
          value: "number",
          label: "number",
        },
        {
          value: "email",
          label: "email",
        },
        {
          value: "password",
          label: "password",
        },
        {
          value: "date",
          label: "date",
        },
        {
          value: "time",
          label: "time",
        },
      ],
    },
    {
      name: "disabled",
      configFor: "checkbox",
    },
    {
      name: "max",
      configFor: "input",
      type: "number",
    },
    {
      name: "maxLength",
      configFor: "input",
      type: "number",
      min: 0,
    },
    {
      name: "min",
      configFor: "input",
      type: "number",
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
      name: "readonly",
      configFor: "checkbox",
    },
    {
      name: "step",
      configFor: "input",
      type: "number",
      min: 0,
    },
  ] as const;
