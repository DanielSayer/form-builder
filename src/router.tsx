import { createBrowserRouter, RouteObject } from "react-router-dom";
import { FormBuilderProvider } from "./components/providers/form-builder";
import { Layout } from "./layout";
import { CustomisePage } from "./pages/customise/page";
import { FormBuilderPage } from "./pages/page";
import { SettingsPage } from "./pages/settings/page";
import SettingsLayout from "./pages/settings/layout";

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
  {
    path: "/settings",
    element: <SettingsLayout />,
    children: [
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: pagesRouter,
  },
]);
