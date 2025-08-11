import React from "react";
import { useTheme } from "../../Context/ThemeContext";
import { Button } from "./Button";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  console.log("ThemeToggle render - current theme:", theme); // Debug log

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        console.log("Theme toggle clicked, current theme:", theme); // Debug log
        toggleTheme();
      }}
      className="!p-2 theme-transition"
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
          <path
            fillRule="evenodd"
            d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zm0 15.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm9-6a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0121 12zm-15.75.75a.75.75 0 000-1.5H3a.75.75 0 000 1.5h1.5zm11.31 5.47a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm-9.72-9.72a.75.75 0 010 1.06L4.78 11.59a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm10.78 1.06a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L18.69 11.59a.75.75 0 01-1.06 0zM6.22 17.78a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L7.28 17.78a.75.75 0 01-1.06 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M21.752 15.002A9.718 9.718 0 0112.004 22C6.486 22 2 17.514 2 12.004 2 7.122 5.662 2.997 10.35 2.17a.75.75 0 01.855.997A7.219 7.219 0 0010.5 6.75c0 4.004 3.246 7.25 7.25 7.25a7.22 7.22 0 003.583-.955.75.75 0 011.003.856 9.707 9.707 0 01-.584 1.101z" />
        </svg>
      )}
    </Button>
  );
};
