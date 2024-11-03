import { Setting } from "@/lib/settings";

export const SETTINGS_ELEMENTS_KEY = "form-builder-settings";

const getSettings = (): Record<Setting, boolean> => {
  const storedSettings = localStorage.getItem(SETTINGS_ELEMENTS_KEY);
  return storedSettings ? JSON.parse(storedSettings) : {};
};

export const getSetting = (key: Setting) => {
  const settings = getSettings();
  return settings[key] ?? false;
};

export const updateSetting = (key: Setting, value: boolean) => {
  const settings = getSettings();
  settings[key] = value;
  localStorage.setItem(SETTINGS_ELEMENTS_KEY, JSON.stringify(settings));
};
