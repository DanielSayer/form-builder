import { generatorMappings } from "@/components/form-elements/template-mappings";
import { ElementConfig } from "./element-config";

export const generateForm = (config: ElementConfig[]) => {
  return generateComponentCode(config);
};

const generateComponentCode = (config: ElementConfig[]) => {
  return `
const MyForm = () => {
  const form = useForm();

  return (
    ${generateJsx(config)}
  )
}
`.trim();
};

const generateJsx = (config: ElementConfig[]) => {
  return `
    <Form {...form}>
      <form>
        ${config
          .map((element) =>
            removeBlankLines(generatorMappings[element.element]({ element })),
          )
          .join("\n\t")}
      </form>
    </Form>
`.trim();
};

const removeBlankLines = (code: string) => {
  return code
    .split("\n")
    .filter((line) => line.trim())
    .join("\n");
};
