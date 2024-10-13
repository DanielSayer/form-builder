export const formElements = ["input"] as const;
export type FormElement = (typeof formElements)[number];

export type ElementConfig = {
  id: string;
  label: string;
  description: string;
  element: FormElement;
};

export type FormElementProps = {
  element: ElementConfig;
};
