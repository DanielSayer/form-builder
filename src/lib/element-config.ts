export type FormElement = "input" | "select" | "checkbox";

export type ElementConfig = {
  id?: string;
  name: string;
  isUsingLabelAsName: boolean;
  label: string;
  description: string;
  element: FormElement;
  extraConfig?: Record<string, unknown>;
};

export const defaultElementConfig = (element: FormElement): ElementConfig => {
  return {
    name: "",
    isUsingLabelAsName: true,
    label: "",
    description: "",
    element,
  };
};

export type FormElementProps = {
  name: string;
  label: string;
  description: string;
  extraConfig?: Record<string, unknown>;
};
