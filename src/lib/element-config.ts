export type FormElement =
  | "input"
  | "select"
  | "checkbox"
  | "textarea"
  | "datepicker";

export type ElementConfig = {
  id?: string;
  name: string;
  isUsingLabelAsName: boolean;
  label: string;
  description: string;
  element: FormElement;
  extraConfig?: Record<string, unknown>;
};

export const defaultElementConfig = (
  element: FormElement,
  defaults: Record<string, unknown> | undefined,
): ElementConfig => {
  return {
    name: "",
    isUsingLabelAsName: true,
    label: "",
    description: "",
    element,
    extraConfig: defaults,
  };
};

export type FormElementProps = {
  name: string;
  label: string;
  description: string;
  extraConfig?: Record<string, unknown>;
};
