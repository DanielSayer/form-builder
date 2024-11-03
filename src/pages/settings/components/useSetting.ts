import { useStorage } from "@/hooks/useStorage";

export const useSetting = (key: string) => {
  const [settings, setSettings] = useStorage<Record<string, boolean>>(
    "form-builder-settings",
    {},
  );

  const setting = settings[key] ?? false;
  const setValue = (value: boolean | ((val: boolean) => boolean)) => {
    const valueToStore = value instanceof Function ? value(setting) : value;
    setSettings({
      ...settings,
      [key]: valueToStore,
    });
  };

  return [setting, setValue] as const;
};
