import { createContext, useContext, useEffect, useState } from "react";

const DEFAULT_COLOR = "zinc";
export const THEME_COLORS = [
  { name: "blue", value: "#2563EB" },
  { name: "green", value: "#16A34A" },
  { name: "orange", value: "#F97316" },
  { name: "red", value: "#DC2626" },
  { name: "rose", value: "#E11D48" },
  { name: "violet", value: "#7C3AED" },
  { name: "yellow", value: "#FACC15" },
  { name: "zinc", value: "#18181B" },
] as const;

type BaseTheme = "dark" | "light" | "system";
type ColorTheme = (typeof THEME_COLORS)[number]["name"];

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: BaseTheme;
  defaultColor?: ColorTheme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: BaseTheme;
  color: ColorTheme;
  setTheme: (theme: BaseTheme) => void;
  setColor: (color: ColorTheme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  color: DEFAULT_COLOR,
  setTheme: () => null,
  setColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColor = DEFAULT_COLOR,
  storageKey = "form-builder-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<BaseTheme>(
    () =>
      (localStorage.getItem(`${storageKey}-mode`) as BaseTheme) || defaultTheme,
  );

  const [color, setColor] = useState<ColorTheme>(
    () =>
      (localStorage.getItem(`${storageKey}-color`) as ColorTheme) ||
      defaultColor,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.remove(
      "blue",
      "green",
      "orange",
      "red",
      "rose",
      "violet",
      "yellow",
      "zinc",
    );

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(color);
    root.classList.add(theme);
  }, [theme, color]);

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value = {
    theme,
    color,
    setTheme: (theme: BaseTheme) => {
      localStorage.setItem(`${storageKey}-mode`, theme);
      setTheme(theme);
    },
    setColor: (color: ColorTheme) => {
      localStorage.setItem(`${storageKey}-color`, color);
      setColor(color);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
