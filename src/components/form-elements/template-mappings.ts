import { FormElement, FormElementProps } from "@/lib/element-config";
import { InputFormElement } from "./input-element";

export const templateMappings: Record<
  FormElement,
  (props: FormElementProps) => JSX.Element
> = {
  input: InputFormElement,
};
