import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@/styles/globals.css";
import { FormBuilderProvider } from "./components/providers/form-builder.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormBuilderProvider>
      <App />
    </FormBuilderProvider>
  </StrictMode>,
);
