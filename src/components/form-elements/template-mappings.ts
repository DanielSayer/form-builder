import { FormElement, FormElementProps } from "@/lib/element-config";
import { generateInputFormElement, InputFormElement } from "./input-element";
import { SelectFormElement } from "./select-element";
import { CheckboxFormElement } from "./checkbox-element";
import {
  inputConfig,
  inputDetailedConfigDefaults,
} from "@/lib/config/form-elements/input";
import {
  generateTextAreaFormElement,
  TextAreaFormElement,
} from "./textarea-element";
import {
  textAreaConfig,
  textAreaDetailedConfigDefaults,
} from "@/lib/config/form-elements/textarea";
import {
  DatePickerFormElement,
  generateDatePickerFormElement,
} from "./date-picker-element";
import {
  datePickerConfig,
  datePickerDetailedConfigDefaults,
} from "@/lib/config/form-elements/date-picker";

export const templateMappings: Record<
  FormElement,
  (props: FormElementProps) => JSX.Element
> = {
  input: InputFormElement,
  select: SelectFormElement,
  checkbox: CheckboxFormElement,
  textarea: TextAreaFormElement,
  datepicker: DatePickerFormElement,
};

export const generatorMappings: Record<
  FormElement,
  (props: FormElementProps) => string
> = {
  input: generateInputFormElement,
  select: () => "",
  checkbox: () => "",
  textarea: generateTextAreaFormElement,
  datepicker: generateDatePickerFormElement,
};

export const detailedConfigDefaultMappings = {
  input: inputDetailedConfigDefaults,
  select: {},
  checkbox: {},
  textarea: textAreaDetailedConfigDefaults,
  datepicker: datePickerDetailedConfigDefaults,
};

type Config = {
  name: string;
  configFor: FormElement;
  [key: string]: unknown;
};

export const extraConfigMappings: Record<FormElement, Config[]> = {
  input: inputConfig,
  select: [],
  checkbox: [],
  textarea: textAreaConfig,
  datepicker: datePickerConfig,
};
