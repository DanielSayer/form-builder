import { Link } from "react-router-dom";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import { Settings } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b bg-background/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b">
          <Link to="/" className="font-semibold">
            <span className="flex items-center">form builder</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/settings"
              className={buttonVariants({ variant: "ghost" })}
            >
              Settings <Settings className="ml-2 h-4 w-4" />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
