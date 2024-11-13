import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface ComboboxProps {
  id: string;
  value: string;
  placeholder: string;
  emptyPlaceholder: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
}

export function Combobox({
  id,
  value,
  placeholder,
  emptyPlaceholder,
  options,
  onChange,
}: Partial<ComboboxProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
          )}
        >
          {value
            ? options?.find((opt) => opt.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    onChange?.(option.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const EXPORTED_COMBOBOX_CODE = `// @/components/combobox.tsx

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface ComboboxProps {
  id: string;
  value: string;
  placeholder: string;
  emptyPlaceholder: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
}

export function Combobox({
  id,
  value,
  placeholder,
  emptyPlaceholder,
  options,
  onChange,
}: Partial<ComboboxProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
          )}
        >
          {value
            ? options?.find((opt) => opt.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    onChange?.(option.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}`;
