import { Link } from "react-router-dom";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b bg-background/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b">
          <Link to="/" className="z-40 flex font-semibold">
            <span className="flex items-center">form builder</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
