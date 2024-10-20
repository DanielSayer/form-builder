import { FormElementDetailedConfig } from "./config";

export type InputExtraFieldsConfig = {
  type: string;
  disabled: boolean;
  max: string;
  maxlength: string;
  min: string;
  minlength: string;
  placeholder: string;
  readonly: boolean;
  step: string;
};

export const inputDetailedConfigDefaults: InputExtraFieldsConfig = {
  type: "text",
  disabled: false,
  max: "",
  maxlength: "",
  min: "",
  minlength: "",
  placeholder: "",
  readonly: false,
  step: "",
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
      name: "maxlength",
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
      name: "minlength",
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
