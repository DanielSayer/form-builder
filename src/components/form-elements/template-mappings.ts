import { FormElement, FormElementProps } from "@/lib/element-config";
import { generateInputFormElement, InputFormElement } from "./input-element";
import { generateSelectFormElement, SelectFormElement } from "./select-element";
import {
  CheckboxFormElement,
  generateCheckboxFormElement,
} from "./checkbox-element";
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
import {
  DateRangePickerFormElement,
  generateDateRangePickerFormElement,
} from "./date-range-picker-element";
import {
  dateRangePickerConfig,
  dateRangePickerDetailedConfigDefaults,
} from "@/lib/config/form-elements/date-range-picker";
import {
  selectConfig,
  selectDetailedConfigDefaults,
} from "@/lib/config/form-elements/select";
import { ListFormElement } from "./list-element";
import {
  checkboxConfig,
  checkboxDetailedConfigDefaults,
} from "@/lib/config/form-elements/checkbox";

export const templateMappings: Record<
  FormElement,
  (props: FormElementProps) => JSX.Element
> = {
  input: InputFormElement,
  select: SelectFormElement,
  checkbox: CheckboxFormElement,
  textarea: TextAreaFormElement,
  datepicker: DatePickerFormElement,
  daterangepicker: DateRangePickerFormElement,
  list: ListFormElement,
};

export const generatorMappings: Record<
  FormElement,
  (props: FormElementProps) => string
> = {
  input: generateInputFormElement,
  select: generateSelectFormElement,
  checkbox: generateCheckboxFormElement,
  textarea: generateTextAreaFormElement,
  datepicker: generateDatePickerFormElement,
  daterangepicker: generateDateRangePickerFormElement,
  list: () => "",
};

export const detailedConfigDefaultMappings: Record<FormElement, unknown> = {
  input: inputDetailedConfigDefaults,
  select: selectDetailedConfigDefaults,
  checkbox: checkboxDetailedConfigDefaults,
  textarea: textAreaDetailedConfigDefaults,
  datepicker: datePickerDetailedConfigDefaults,
  daterangepicker: dateRangePickerDetailedConfigDefaults,
  list: {},
};

type Config = {
  name: string;
  configFor: FormElement;
  description?: string;
  [key: string]: unknown;
};

export const extraConfigMappings: Record<FormElement, Config[]> = {
  input: inputConfig,
  select: selectConfig,
  checkbox: checkboxConfig,
  textarea: textAreaConfig,
  datepicker: datePickerConfig,
  daterangepicker: dateRangePickerConfig,
  list: [],
};
