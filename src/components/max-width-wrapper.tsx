import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type MaxWidthWrapperProps = {
  className?: string;
};

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps & PropsWithChildren) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-4 md:px-20", className)}
    >
      {children}
    </div>
  );
};
