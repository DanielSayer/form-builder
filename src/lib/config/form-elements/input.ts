import { FormElementDetailedConfig } from "./config";

export const inputConfig: FormElementDetailedConfig[] = [
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
    name: "autocapitalize",
    configFor: "checkbox",
  },
  {
    name: "autocomplete",
    configFor: "checkbox",
  },
  {
    name: "disabled",
    configFor: "checkbox",
  },
  {
    name: "max",
    configFor: "input",
    type: "number",
    min: 0,
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
    min: 0,
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
