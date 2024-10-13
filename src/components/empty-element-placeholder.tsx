import { Ghost } from "lucide-react";

const EmptyElementPlaceholder = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
      <Ghost className="mb-4" />
      <p>Nothing here yet.</p>
      <p>Add some elements to get started.</p>
    </div>
  );
};

export { EmptyElementPlaceholder };
