// Theme colors configuration for Tailwind CSS v4
export const themeColors = {
  light: {
    background: "#f9fafb",
    foreground: "#111827",
    card: "#ffffff",
    "card-foreground": "#111827",
    primary: "#3b82f6",
    "primary-foreground": "#ffffff",
    secondary: "#6b7280",
    "secondary-foreground": "#ffffff",
    muted: "#f3f4f6",
    "muted-foreground": "#6b7280",
    accent: "#f3f4f6",
    "accent-foreground": "#111827",
    destructive: "#ef4444",
    "destructive-foreground": "#ffffff",
    border: "#e5e7eb",
    input: "#ffffff",
    ring: "#3b82f6",
  },
  dark: {
    background: "#111827",
    foreground: "#f9fafb",
    card: "#1f2937",
    "card-foreground": "#f9fafb",
    primary: "#3b82f6",
    "primary-foreground": "#ffffff",
    secondary: "#4b5563",
    "secondary-foreground": "#ffffff",
    muted: "#374151",
    "muted-foreground": "#9ca3af",
    accent: "#374151",
    "accent-foreground": "#f9fafb",
    destructive: "#ef4444",
    "destructive-foreground": "#ffffff",
    border: "#374151",
    input: "#1f2937",
    ring: "#3b82f6",
  },
} as const;

export type Theme = keyof typeof themeColors;
export type ThemeColor = keyof typeof themeColors.light;
