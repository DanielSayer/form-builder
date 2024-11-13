import { createBrowserRouter, RouteObject } from "react-router-dom";
import { FormBuilderProvider } from "./components/providers/form-builder";
import { Layout } from "./layout";
import { CustomisePage } from "./pages/customise/page";
import { FormBuilderPage } from "./pages/page";
import { ComponentsPage } from "./pages/settings/components/page";
import SettingsLayout from "./pages/settings/layout";
import { AppearancePage } from "./pages/settings/appearance/page";
import { SettingsPage } from "./pages/settings/page";

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
      {
        path: "/settings/components",
        element: <ComponentsPage />,
      },
      {
        path: "/settings/appearance",
        element: <AppearancePage />,
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
