import { ElementConfig } from "@/lib/element-config";
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
  const [formElements, setFormElements] = useState<ElementConfig[]>(() => {
    const storedElements = localStorage.getItem("formElements");
    return storedElements ? JSON.parse(storedElements) : [];
  });

  const updateElement = useCallback((element: ElementConfig) => {
    setFormElements((curr) =>
      curr.map((x) => (x.id === element.id ? element : x)),
    );
  }, []);

  const appendElement = useCallback((element: ElementConfig) => {
    setFormElements((curr) => [...curr, element]);
  }, []);

  useEffect(() => {
    localStorage.setItem("formElements", JSON.stringify(formElements));
  }, [formElements]);

  return (
    <FormBuilderContext.Provider
      value={{ formElements, updateElement, appendElement }}
      children={children}
    />
  );
};

export { FormBuilderProvider, useFormBuilder };
