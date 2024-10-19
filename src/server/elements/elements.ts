import { ElementConfig } from "@/lib/element-config";

const FORM_ELEMENTS_KEY = "formElements";

export const getElements = (): ElementConfig[] => {
  const storedElements = localStorage.getItem(FORM_ELEMENTS_KEY);
  return storedElements ? JSON.parse(storedElements) : [];
};

export const getElement = (elementId: string | undefined) => {
  const elements = getElements();
  const element = elements.find((element) => element.id === elementId);

  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  return element;
};

export const saveElements = (elements: ElementConfig[]) => {
  localStorage.setItem(FORM_ELEMENTS_KEY, JSON.stringify(elements));
};
