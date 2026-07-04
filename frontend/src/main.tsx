import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppProviders } from "@/app/providers";

import App from "./App";
import "./index.css";
import { enableMocking } from "./mocks/enableMocking";

async function prepareApp() {
  try {
    await enableMocking();
  } catch {
    // Mocking should not block the app from rendering.
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  );
}

void prepareApp();
