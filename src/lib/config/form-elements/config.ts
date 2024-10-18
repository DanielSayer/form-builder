type ConfigBase = {
  name: string;
};

export type InputConfig = {
  configFor: "input";
  type: "number" | "text";
  min?: number;
};

export type CheckboxConfig = {
  configFor: "checkbox";
};

export type SelectConfig = {
  configFor: "select";
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
};

type Config = InputConfig | CheckboxConfig | SelectConfig;

export type FormElementDetailedConfig = ConfigBase & Config;
