import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { UnitProvider } from "./context/UnitContext.tsx";
import { FavoriteProvider } from "./context/FavoriteContext.tsx";
import { CoordsProvider } from "./context/CoordsContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UnitProvider>
      <FavoriteProvider>
        <CoordsProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
              <Toaster richColors position="top-right" />
            </BrowserRouter>
          </QueryClientProvider>
        </CoordsProvider>
      </FavoriteProvider>
    </UnitProvider>
  </StrictMode>
);

