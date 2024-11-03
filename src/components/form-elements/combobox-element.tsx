import { ComboboxExtraFieldsConfig } from "@/lib/config/form-elements/combobox";
import { FormElementProps } from "@/lib/element-config";
import { Combobox } from "../exported-components/combobox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { getSetting } from "@/server/settings/settings";
import { settings } from "@/lib/settings";

export function ComboboxFormElement({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) {
  const typedConfig = extraConfig as Partial<ComboboxExtraFieldsConfig>;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Combobox
              id={name}
              value={field.value}
              onChange={field.onChange}
              {...typedConfig}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export const generateComboboxFormElement = ({
  name,
  label,
  description,
  extraConfig,
}: FormElementProps) => {
  const isEnabled = getSetting(settings.CUSTOM_COMBOBOX);
  const typedConfig = extraConfig as Partial<ComboboxExtraFieldsConfig>;

  const hoistedVariables = [
    `const ${name}Options = ${JSON.stringify(typedConfig.options ?? [], null, 2)}`,
  ];

  if (isEnabled) {
    const imports = [
      {
        from: "@/components/ui/form",
        imports: [
          "FormControl",
          description ? "FormDescription" : "",
          "FormField",
          "FormItem",
          "FormLabel",
          "FormMessage",
        ],
      },
      {
        from: "@/components/combobox",
        imports: ["Combobox"],
      },
    ];

    const componentCode = `
<FormField
            name="${name}"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>${label}</FormLabel>
                <Combobox
                  id={name}
                  value={field.value}
                  onChange={field.onChange}
                  options={${name}Options}
                  ${typedConfig.placeholder ? `placeholder="${typedConfig.placeholder}"` : ``}
                  ${typedConfig.emptyPlaceholder ? `emptyPlaceholder="${typedConfig.emptyPlaceholder}"` : ``}
                />
                ${description ? `<FormDescription>${description}</FormDescription>` : ``}
                <FormMessage />
              </FormItem>
            )}
          />
    `;

    return { imports, componentCode, hoistedVariables };
  }

  const imports = [
    {
      from: "@/components/ui/form",
      imports: [
        "FormControl",
        description ? "FormDescription" : "",
        "FormField",
        "FormItem",
        "FormLabel",
        "FormMessage",
      ],
    },
    {
      from: "@/components/ui/popover",
      imports: ["Popover", "PopoverContent", "PopoverTrigger"],
    },
    {
      from: "@/components/ui/button",
      imports: ["Button"],
    },
    {
      from: "@/components/ui/command",
      imports: [
        "Command",
        "CommandEmpty",
        "CommandGroup",
        "CommandInput",
        "CommandItem",
        "CommandList",
      ],
    },
    {
      from: "lucide-react",
      imports: ["ChevronsUpDown", "Check"],
    },
    {
      from: "@/lib/utils",
      imports: ["cn"],
    },
  ];

  const componentCode = `
        <FormField
          name="${name}"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>${label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? ${name}Options.find(
                            (opt) => opt.value === field.value
                          )?.label
                        : "${typedConfig.placeholder ?? ``}"}                      
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="${typedConfig.placeholder ?? ``}" />
                    <CommandList>
                      <CommandEmpty>${typedConfig.emptyPlaceholder ?? ``}</CommandEmpty>
                      <CommandGroup>
                        {${name}Options?.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              field.onChange(option.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                option.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
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
              ${description ? `<FormDescription>${description}</FormDescription>` : ``}
              <FormMessage />
            </FormItem>
          )}
        />
`.trim();

  return { hoistedVariables, imports, componentCode };
};
