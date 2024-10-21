import { FormElement, FormElementProps } from "@/lib/element-config";
import { generateInputFormElement, InputFormElement } from "./input-element";
import { SelectFormElement } from "./select-element";
import { CheckboxFormElement } from "./checkbox-element";
import {
  inputConfig,
  inputDetailedConfigDefaults,
} from "@/lib/config/form-elements/input";

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

export const detailedConfigDefaultMappings = {
  input: inputDetailedConfigDefaults,
  select: {},
  checkbox: {},
};

type Config = {
  name: string;
  configFor: FormElement;
  [key: string]: any;
};

export const extraConfigMappings: Record<FormElement, Config[]> = {
  input: inputConfig,
  select: [],
  checkbox: [],
};
