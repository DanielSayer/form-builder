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
  );
};

export default MyForm;
`.trim();
};

const generateJsx = (config: ElementConfig[]) => {
  return `
    <Form {...form}>
      <form>
        ${config
          .map((element) =>
            removeBlankLines(
              generatorMappings[element.element]({
                name: element.name,
                label: element.label,
                description: element.description,
                extraConfig: element.extraConfig,
              }),
            ),
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
