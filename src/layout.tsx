import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./components/providers/theme-provider";

export function Layout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <ThemeProvider>
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </div>
  );
}
