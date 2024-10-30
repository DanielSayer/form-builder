import { ElementConfig } from "../element-config";
import { generateComponentCode } from "./components";
import { generateImports, Import } from "./imports";

export type GeneratedCode = {
  imports?: Import[];
  hoistedVariables?: string[];
  componentCode: string;
};

export const generateForm = (config: ElementConfig[]): string => {
  const generated = generateComponentCode(config);

  return [
    generateImports(generated.imports || []),
    "\n",
    ...(generated.hoistedVariables || []),
    "\n",
    generated.componentCode,
  ]
    .filter(Boolean)
    .join("\n");
};
