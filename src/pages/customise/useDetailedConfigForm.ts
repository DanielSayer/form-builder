import { detailedConfigDefaultMappings } from "@/components/form-elements/template-mappings";
import { ElementConfig, FormElement } from "@/lib/element-config";
import { useForm } from "react-hook-form";

const configureDefaultValues = (
  element: FormElement,
  extraConfig: object | undefined,
) => {
  const currentConfig = { ...extraConfig } as Record<string, unknown>;
  const defaults = detailedConfigDefaultMappings[element] as Record<
    string,
    unknown
  >;

  Object.keys(defaults).forEach((key) => {
    if (currentConfig[key] === undefined) {
      currentConfig[key] = defaults[key];
    }
  });

  return currentConfig;
};

export const stripExtraConfig = (
  element: FormElement,
  extraConfig: object | undefined,
) => {
  if (!extraConfig) {
    return {};
  }

  const strippedConfig = { ...extraConfig } as Record<string, unknown>;
  const defaults = detailedConfigDefaultMappings[element] as Record<
    string,
    unknown
  >;

  Object.keys(extraConfig).forEach((key) => {
    if (!(key in defaults)) {
      delete strippedConfig[key];
    } else if (strippedConfig[key] === defaults[key]) {
      delete strippedConfig[key];
    }
  });

  return strippedConfig;
};

const useDetailedConfigForm = ({
  element,
  extraConfig,
  ...config
}: ElementConfig) => {
  const form = useForm<ElementConfig>({
    defaultValues: {
      ...config,
      element,
      extraConfig: {
        ...configureDefaultValues(element, extraConfig),
      },
    },
  });

  return form;
};

export default useDetailedConfigForm;
