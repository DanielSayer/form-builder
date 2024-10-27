import { ElementConfig } from "@/lib/element-config";
import { getElements, saveElements } from "@/server/elements/elements";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

type FormBuilderContextValue = {
  formElements: ElementConfig[];
  appendElement: (element: ElementConfig) => void;
  updateElement: (element: ElementConfig) => void;
  updateElements: (elements: ElementConfig[]) => void;
  clearElements: () => void;
};

const FormBuilderContext = React.createContext<FormBuilderContextValue>(
  {} as FormBuilderContextValue,
);

const useFormBuilder = () => {
  const context = React.useContext(FormBuilderContext);
  if (!context) {
    throw new Error("useFormBuilder must be used within a FormBuilderProvider");
  }
  return context;
};

const FormBuilderProvider = ({ children }: PropsWithChildren) => {
  const [formElements, setFormElements] = useState<ElementConfig[]>(() =>
    getElements(),
  );

  const updateElements = useCallback((elements: ElementConfig[]) => {
    setFormElements(elements);
  }, []);

  const updateElement = useCallback((element: ElementConfig) => {
    setFormElements((curr) =>
      curr.map((x) => (x.id === element.id ? element : x)),
    );
  }, []);

  const appendElement = useCallback((element: ElementConfig) => {
    setFormElements((curr) => [...curr, element]);
  }, []);

  const clearElements = useCallback(() => {
    setFormElements([]);
  }, []);

  useEffect(() => {
    saveElements(formElements);
  }, [formElements]);

  return (
    <FormBuilderContext.Provider
      value={{
        formElements,
        updateElement,
        appendElement,
        clearElements,
        updateElements,
      }}
      children={children}
    />
  );
};

export { FormBuilderProvider, useFormBuilder };
