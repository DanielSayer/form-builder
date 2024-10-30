import { DisplayProps } from "@/components/display";
import { SelectDisplayElement } from "@/components/form-elements/select-element";
import { DatePicker } from "@/components/ui/date-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormElement } from "../element-config";

type FormElementDisplay = DisplayProps & {
  formElement: FormElement;
};

export const displayElements: FormElementDisplay[] = [
  {
    formElement: "input",
    id: "input",
    title: "Input",
    description: "A basic input field",
    render: (props) => <Input id={props.id} />,
  },
  {
    formElement: "input",
    id: "number-input",
    title: "Number Input",
    description: "A basic number input field",
    render: (props) => <Input id={props.id} {...props.defaults} />,
    defaults: { type: "number" },
  },
  {
    formElement: "input",
    id: "email-input",
    title: "Email Input",
    description: "A basic email input field",
    render: (props) => <Input id={props.id} {...props.defaults} />,
    defaults: { type: "email" },
  },
  {
    formElement: "input",
    id: "password-input",
    title: "Password Input",
    description: "A basic password input field",
    render: (props) => <Input id={props.id} {...props.defaults} />,
    defaults: { type: "password" },
  },
  {
    formElement: "input",
    id: "time-input",
    title: "Time Input",
    description: "A basic time input field",
    render: (props) => <Input id={props.id} {...props.defaults} />,
    defaults: { type: "time" },
  },
  {
    formElement: "textarea",
    id: "textarea",
    title: "Text Area",
    description: "An expandable text area",
    render: (props) => (
      <Textarea id={props.id} className="h-10 min-h-10 resize-none" />
    ),
  },
  {
    formElement: "datepicker",
    id: "datepicker",
    title: "Date Picker",
    description: "A date picker",
    render: (props) => <DatePicker id={props.id} />,
    defaults: { placeholder: "Pick a date" },
  },
  {
    formElement: "daterangepicker",
    id: "daterangepicker",
    title: "Date Range Picker",
    description: "A date range picker",
    render: (props) => <DateRangePicker id={props.id} />,
    defaults: { placeholder: "Pick a date" },
  },
  {
    formElement: "select",
    id: "select",
    title: "Select",
    description: "A select field",
    render: (props) => (
      <SelectDisplayElement id={props.id} {...props.defaults} />
    ),
    defaults: {
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ],
      placeholder: "Select an option",
    },
  },
];
