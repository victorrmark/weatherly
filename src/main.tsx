import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { UnitProvider } from "./context/UnitContext.tsx";
import { FavoriteProvider } from "./context/FavoriteContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UnitProvider>
      <FavoriteProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster richColors position="top-right" />
        </QueryClientProvider>
      </FavoriteProvider>
    </UnitProvider>
  </StrictMode>
);
