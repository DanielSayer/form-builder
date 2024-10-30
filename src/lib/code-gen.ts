import { generatorMappings } from "@/components/form-elements/template-mappings";
import { ElementConfig } from "./element-config";

export type GeneratedCode = {
  imports?: string[];
  hoistedVariables?: string[];
  componentCode: string;
};

export const generateForm = (config: ElementConfig[]): string => {
  const generated = generateComponentCode(config);

  return [
    ...(generated.imports || []),
    "",
    ...(generated.hoistedVariables || []),
    "",
    generated.componentCode,
  ].join("\n");
};

const generateComponentCode = (config: ElementConfig[]): GeneratedCode => {
  const collectedCode = config.map((element) =>
    generatorMappings[element.element]({
      name: element.name,
      label: element.label,
      description: element.description,
      extraConfig: element.extraConfig,
    }),
  );

  // Collect all hoisted variables and imports
  const hoistedVariables = collectedCode
    .flatMap((code) => code.hoistedVariables || [])
    .filter((v, i, arr) => arr.indexOf(v) === i); // Remove duplicates

  const imports = collectedCode
    .flatMap((code) => code.imports || [])
    .filter((v, i, arr) => arr.indexOf(v) === i); // Remove duplicates

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
