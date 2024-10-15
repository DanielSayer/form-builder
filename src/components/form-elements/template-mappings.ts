import { FormElement, FormElementProps } from "@/lib/element-config";
import { generateInputFormElement, InputFormElement } from "./input-element";

export const templateMappings: Record<
  FormElement,
  (props: FormElementProps) => JSX.Element
> = {
  input: InputFormElement,
};

export const generatorMappings: Record<
  FormElement,
  (props: FormElementProps) => string
> = {
  input: generateInputFormElement,
};
