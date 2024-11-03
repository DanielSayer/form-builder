import { useEffect, useState } from "react";
import { Setting } from "@/lib/settings";
import {
  getSetting,
  SETTINGS_ELEMENTS_KEY,
  updateSetting,
} from "@/server/settings/settings";

export const useSetting = (key: Setting) => {
  const [setting, setSetting] = useState(() => getSetting(key));

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SETTINGS_ELEMENTS_KEY) {
        setSetting(getSetting(key));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  const setValue = (value: boolean | ((prevValue: boolean) => boolean)) => {
    const newValue = value instanceof Function ? value(setting) : value;
    updateSetting(key, newValue);
    setSetting(newValue);
  };

  return [setting, setValue] as const;
};
