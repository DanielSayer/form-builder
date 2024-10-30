import { generatorMappings } from "@/components/form-elements/template-mappings";
import { ElementConfig } from "./element-config";

export type GeneratedCode = {
  imports?: Import[];
  hoistedVariables?: string[];
  componentCode: string;
};

type Import = {
  from: string;
  imports: string[];
  isDefault?: boolean;
};

export const generateForm = (config: ElementConfig[]): string => {
  const generated = generateComponentCode(config);

  return [
    generateImports(generated.imports || []),
    "",
    ...(generated.hoistedVariables || []),
    "",
    generated.componentCode,
  ]
    .filter(Boolean)
    .join("\n");
};

const generateImports = (imports: Import[]): string => {
  // Group imports by source
  const groupedImports = imports.reduce(
    (acc, curr) => {
      if (!acc[curr.from]) {
        acc[curr.from] = { default: [], named: [] };
      }
      curr.imports.forEach((imp) => {
        if (curr.isDefault) {
          acc[curr.from].default.push(imp);
        } else {
          acc[curr.from].named.push(imp);
        }
      });
      return acc;
    },
    {} as Record<string, { default: string[]; named: string[] }>,
  );

  // Generate import statements
  return Object.entries(groupedImports)
    .map(([source, { default: defaultImports, named }]) => {
      const parts: string[] = [];

      if (defaultImports.length) {
        parts.push(...defaultImports);
      }

      if (named.length) {
        // Sort imports alphabetically
        const namedStr = named.sort().join(",\n  ");
        parts.push(`{\n  ${namedStr}\n}`);
      }

      return `import ${parts.join(", ")} from "${source}";`;
    })
    .join("\n");
};

const generateComponentCode = (config: ElementConfig[]): GeneratedCode => {
  // Base imports that are always needed
  const baseImports: Import[] = [
    {
      from: "@/components/ui/form",
      imports: ["Form"],
    },
    {
      from: "react-hook-form",
      imports: ["useForm"],
    },
  ];

  const collectedCode = config.map((element) =>
    generatorMappings[element.element]({
      name: element.name,
      label: element.label,
      description: element.description,
      extraConfig: element.extraConfig,
    }),
  );

  // Merge base imports with component imports
  const imports = [
    ...baseImports,
    ...collectedCode.flatMap((code) => code.imports || []),
  ].reduce((acc, curr) => {
    const existing = acc.find((imp) => imp.from === curr.from);
    if (existing) {
      existing.imports = [...new Set([...existing.imports, ...curr.imports])];
      return acc;
    }
    return [...acc, curr];
  }, [] as Import[]);

  const hoistedVariables = collectedCode
    .flatMap((code) => code.hoistedVariables || [])
    .filter((v, i, arr) => arr.indexOf(v) === i);

  const jsxElements = collectedCode
    .map((code) => removeBlankLines(code.componentCode))
    .join("\n\t");

  return {
    imports,
    hoistedVariables,
    componentCode: `
const MyForm = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <form>
        ${jsxElements}
      </form>
    </Form>
  );
};

export default MyForm;
`.trim(),
  };
};

const removeBlankLines = (code: string) => {
  return code
    .split("\n")
    .filter((line) => line.trim())
    .join("\n");
};

export const spreadExtraConfig = (extraConfig: object | undefined) => {
  if (!extraConfig) {
    return "";
  }

  const mappedConfig = extraConfig as Record<string, unknown>;
  return `
    ${Object.keys(mappedConfig)
      .map((key) => {
        if (typeof mappedConfig[key] === "string") {
          return `${key}={"${mappedConfig[key]}"} `;
        }

        return `${key}={${mappedConfig[key]}} `;
      })
      .join("")}
`.trim();
};
