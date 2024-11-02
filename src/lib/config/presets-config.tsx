import { DisplayProps } from "@/components/display";
import { Select } from "@/components/exported-components/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/exported-components/date-picker";
import { DateRangePicker } from "@/components/exported-components/date-range-picker";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FormElement } from "../element-config";
import { Combobox } from "@/components/exported-components/combobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
    formElement: "input",
    id: "color-input",
    title: "Color Input",
    description: "A basic color input field",
    render: (props) => <Input id={props.id} {...props.defaults} />,
    defaults: { type: "color" },
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
    render: (props) => <Select id={props.id} {...props.defaults} />,
    defaults: {
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ],
      placeholder: "Select an option",
    },
  },
  {
    formElement: "checkbox",
    id: "checkbox",
    title: "Checkbox",
    description: "A single checkbox",
    render: (props) => (
      <div className="flex items-center space-x-2">
        <Checkbox id={props.id} />
        <label
          htmlFor={props.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    ),
  },
  {
    formElement: "checkboxlist",
    id: "checkboxlist",
    title: "Checkbox List",
    description: "A list of checkboxes",
    render: (props) => (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id={props.id} />
          <label
            htmlFor={props.id}
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Click me
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id={`${props.id}-1`} />
          <label
            htmlFor={`${props.id}-1`}
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Or me
          </label>
        </div>
      </div>
    ),
    defaults: {
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ],
    },
  },
  {
    formElement: "switch",
    id: "switch",
    title: "Switch",
    description: "A single switch",
    render: (props) => (
      <div className="flex items-center space-x-2">
        <Switch id={props.id} />
        <label htmlFor={props.id} className="text-sm font-medium leading-none">
          Marketing Emails
        </label>
      </div>
    ),
  },
  {
    formElement: "combobox",
    id: "combobox",
    title: "Combobox",
    description: "A combobox",
    render: (props) => <Combobox id={props.id} {...props.defaults} />,
    defaults: {
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ],
      placeholder: "Select an option",
      emptyPlaceholder: "No results.",
    },
  },
  {
    formElement: "radiogroup",
    id: "radiogroup",
    title: "Radio Group",
    description: "A radio group",
    render: (props) => (
      <RadioGroup defaultValue="comfortable" id={props.id}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
      </RadioGroup>
    ),
    defaults: {
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ],
    },
  },
];
