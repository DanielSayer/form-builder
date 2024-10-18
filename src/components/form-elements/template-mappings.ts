import { FormElement, FormElementProps } from "@/lib/element-config";
import { generateInputFormElement, InputFormElement } from "./input-element";
import { SelectFormElement } from "./select-element";
import { CheckboxFormElement } from "./checkbox-element";

export const templateMappings: Record<
  FormElement,
  (props: FormElementProps) => JSX.Element
> = {
  input: InputFormElement,
  select: SelectFormElement,
  checkbox: CheckboxFormElement,
};

export const generatorMappings: Record<
  FormElement,
  (props: FormElementProps) => string
> = {
  input: generateInputFormElement,
  select: () => "",
  checkbox: () => "",
};
