import {
  checkboxConfig,
  checkboxDetailedConfigDefaults,
} from "@/lib/config/form-elements/checkbox";
import {
  checkboxListConfig,
  checkboxListDetailedConfigDefaults,
} from "@/lib/config/form-elements/checkbox-list";
import {
  datePickerConfig,
  datePickerDetailedConfigDefaults,
} from "@/lib/config/form-elements/date-picker";
import {
  dateRangePickerConfig,
  dateRangePickerDetailedConfigDefaults,
} from "@/lib/config/form-elements/date-range-picker";
import {
  inputConfig,
  inputDetailedConfigDefaults,
} from "@/lib/config/form-elements/input";
import {
  selectConfig,
  selectDetailedConfigDefaults,
} from "@/lib/config/form-elements/select";
import {
  textAreaConfig,
  textAreaDetailedConfigDefaults,
} from "@/lib/config/form-elements/textarea";
import { FormElement, FormElementProps } from "@/lib/element-config";
import {
  CheckboxFormElement,
  generateCheckboxFormElement,
} from "./checkbox-element";
import {
  CheckboxListFormElement,
  generateCheckboxListFormElement,
} from "./checkbox-list";
import {
  DatePickerFormElement,
  generateDatePickerFormElement,
} from "./date-picker-element";
import {
  DateRangePickerFormElement,
  generateDateRangePickerFormElement,
} from "./date-range-picker-element";
import { generateInputFormElement, InputFormElement } from "./input-element";
import { ListFormElement } from "./list-element";
import { generateSelectFormElement, SelectFormElement } from "./select-element";
import {
  generateTextAreaFormElement,
  TextAreaFormElement,
} from "./textarea-element";
import { GeneratedCode } from "@/lib/code-gen/form";

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
  checkboxlist: CheckboxListFormElement,
};

export const generatorMappings: Record<
  FormElement,
  (props: FormElementProps) => GeneratedCode
> = {
  input: generateInputFormElement,
  select: generateSelectFormElement,
  checkbox: generateCheckboxFormElement,
  textarea: generateTextAreaFormElement,
  datepicker: generateDatePickerFormElement,
  daterangepicker: generateDateRangePickerFormElement,
  list: () => ({
    componentCode: "",
  }),
  checkboxlist: generateCheckboxListFormElement,
};

export const detailedConfigDefaultMappings: Record<FormElement, unknown> = {
  input: inputDetailedConfigDefaults,
  select: selectDetailedConfigDefaults,
  checkbox: checkboxDetailedConfigDefaults,
  textarea: textAreaDetailedConfigDefaults,
  datepicker: datePickerDetailedConfigDefaults,
  daterangepicker: dateRangePickerDetailedConfigDefaults,
  list: {},
  checkboxlist: checkboxListDetailedConfigDefaults,
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
  checkboxlist: checkboxListConfig,
};
