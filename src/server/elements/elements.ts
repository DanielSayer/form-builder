import { ElementConfig } from "@/lib/element-config";

const FORM_ELEMENTS_KEY = "form-builder-elements";

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

export const updateElement = (element: ElementConfig) => {
  const elements = getElements();
  const index = elements.findIndex((x) => x.id === element.id);

  if (index === -1) {
    throw new Error(`Element with id ${element.id} not found`);
  }

  elements[index] = element;
  saveElements(elements);
};
