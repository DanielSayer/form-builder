import { DisplayProps } from "@/components/display";
import { DatePicker } from "@/components/ui/date-picker";
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
  },
];
