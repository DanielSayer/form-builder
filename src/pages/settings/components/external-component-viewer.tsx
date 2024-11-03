import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clipboard } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

type ExternalComponentViewerProps = {
  title: string;
  description: string;
  componentCode: string;
};

export const ExternalComponentViewer = ({
  title,
  description,
  componentCode,
}: ExternalComponentViewerProps) => {
  const handleClick = () => {
    navigator.clipboard.writeText(componentCode);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Our Example</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[40%]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="relative">
          <SyntaxHighlighter
            language="typescript"
            style={github}
            customStyle={{
              borderRadius: "0.5rem",
              maxHeight: "50vh",
            }}
          >
            {componentCode}
          </SyntaxHighlighter>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-3 rounded-full text-muted-foreground hover:text-foreground"
            onClick={handleClick}
          >
            <Clipboard className="h-4 w-4 transition-all" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
