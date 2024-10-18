import { createBrowserRouter } from "react-router-dom";
import { FormBuilderPage } from "./pages/page";
import { CustomisePage } from "./pages/customise/page";
import { FormBuilderProvider } from "./components/providers/form-builder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <FormBuilderProvider>
        <FormBuilderPage />
      </FormBuilderProvider>
    ),
  },
  {
    path: "/customise/:elementId",
    element: <CustomisePage />,
  },
]);
