import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SidebarNav } from "@/components/side-nav";
import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";

const sidebarNavItems = [
  {
    title: "Just settings",
    to: "/settings",
  },
  {
    title: "Components",
    to: "/settings/components",
  },
  {
    title: "Appearance",
    to: "/settings/appearance",
  },
  {
    title: "Notifications",
    to: "/examples/forms/notifications",
  },
  {
    title: "Display",
    to: "/examples/forms/display",
  },
];

export default function SettingsLayout() {
  return (
    <MaxWidthWrapper>
      <div className="space-y-6 pb-16 pt-10">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Configure your form builder here.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
