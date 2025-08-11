/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "app-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(
      THEME_STORAGE_KEY
    ) as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  } catch {
    return "light";
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  const applyThemeClass = useCallback((t: Theme) => {
    const root = document.documentElement;
    console.log("Applying theme:", t);

    if (t === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    root.offsetHeight;
    console.log("Root classes:", root.classList.toString()); // Debug log
  }, []);

  const setTheme = useCallback(
    (t: Theme) => {
      console.log("Setting theme to:", t);
      setThemeState(t);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, t);
      } catch {
        console.error("Failed to save theme to localStorage");
      }
      applyThemeClass(t);
    },
    [applyThemeClass]
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
  }, [theme, setTheme]);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme, applyThemeClass]);

  const value: ThemeContextValue = { theme, toggleTheme, setTheme };
  return React.createElement(ThemeContext.Provider, { value }, children);
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
