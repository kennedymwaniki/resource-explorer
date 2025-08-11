import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { routeTree } from "./App";
import { ThemeProvider } from "./Context/ThemeContext";
import { FavoritesProvider } from "./Context/FavoritesContext";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavoritesProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Analytics />
      </ThemeProvider>
    </FavoritesProvider>
  </StrictMode>
);
