import { Ghost } from "lucide-react";

const EmptyElementPlaceholder = () => {
  return (
    <div className="text-muted-foreground">
      <div className="mt-80 flex flex-1 flex-col items-center justify-center text-center">
        <Ghost className="mb-4" />
        <p>Nothing here yet.</p>
        <p>Add some elements to get started.</p>
      </div>
    </div>
  );
};

export { EmptyElementPlaceholder };
