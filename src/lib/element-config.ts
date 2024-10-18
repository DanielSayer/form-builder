export const formElements = ["input", "select", "checkbox"] as const;
export type FormElement = (typeof formElements)[number];

export type ElementConfig = {
  id: string;
  name: string;
  isUsingLabelAsName: boolean;
  label: string;
  description: string | undefined;
  element: FormElement;
};

export const defaultElementConfig = (element: FormElement): ElementConfig => {
  return {
    id: crypto.randomUUID(),
    name: "",
    isUsingLabelAsName: true,
    label: "",
    description: undefined,
    element,
  };
};

export type FormElementProps = {
  name: string;
  label: string;
  description?: string;
};
