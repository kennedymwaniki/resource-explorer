import React from "react";
import { useTheme } from "../../Context/ThemeContext";
import { Button } from "./Button";
import { BsSun, BsMoon } from "react-icons/bs";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  console.log("ThemeToggle render - current theme:", theme);

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        console.log("Theme toggle clicked, current theme:", theme);
        toggleTheme();
      }}
      className="!p-2 theme-transition"
    >
      {isDark ? <BsMoon className="w-5 h-5" /> : <BsSun className="w-5 h-5" />}
    </Button>
  );
};
