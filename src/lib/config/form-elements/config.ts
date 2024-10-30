type ConfigBase<T> = {
  name: keyof T;
};

type InputConfig = {
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

export type ListConfig = {
  configFor: "list";
};

type Config = InputConfig | CheckboxConfig | SelectConfig | ListConfig;

export type FormElementDetailedConfig<T> = ConfigBase<T> & Config;
