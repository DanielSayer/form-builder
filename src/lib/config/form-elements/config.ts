type ConfigBase<T> = {
  name: keyof T;
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

export type FormElementDetailedConfig<T> = ConfigBase<T> & Config;
