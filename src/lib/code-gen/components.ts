import { generatorMappings } from "@/components/form-elements/template-mappings";
import { ElementConfig } from "../element-config";
import { Import } from "./imports";
import { removeBlankLines } from "./utils";
import { GeneratedCode } from "./form";

export const generateComponentCode = (
  config: ElementConfig[],
): GeneratedCode => {
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
