import {
  Select as SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectProps {
  id: string;
  options: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  defaultValue: string;
  onChange: (value: string) => void;
}

export function Select({
  id,
  options,
  placeholder,
  defaultValue,
  onChange,
}: Partial<SelectProps>) {
  return (
    <SelectContainer onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectContainer>
  );
}
