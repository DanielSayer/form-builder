import { createBrowserRouter, RouteObject } from "react-router-dom";
import { FormBuilderPage } from "./pages/page";
import { CustomisePage } from "./pages/customise/page";
import { FormBuilderProvider } from "./components/providers/form-builder";
import { Layout } from "./layout";

const pagesRouter: RouteObject[] = [
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
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: pagesRouter,
  },
]);
