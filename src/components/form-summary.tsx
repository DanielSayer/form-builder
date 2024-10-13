import { ElementConfig } from "@/lib/element-config";
import { ArrowRight } from "lucide-react";
import { EmptyElementPlaceholder } from "./empty-element-placeholder";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type FormSummaryProps = {
  config: ElementConfig[];
  selectElement: (element: ElementConfig) => void;
};

const FormSummary = ({ config, selectElement }: FormSummaryProps) => {
  return (
    <div className="h-full space-y-3 overflow-auto pb-8">
      {config.length === 0 && <EmptyElementPlaceholder />}

      {config.map((element) => (
        <Card key={element.id}>
          <CardHeader className="p-3">
            <div className="flex items-center justify-between">
              <CardTitle className="truncate text-lg">
                {element.label || `Your ${element.element} element`}
              </CardTitle>
              <Button onClick={() => selectElement(element)} size="sm">
                Customise <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 p-3 pt-0">
            <div>
              <p className="font-semibold">Label</p>
              <p id="label">{element.label || "No label provided."}</p>
            </div>
            <div>
              <p className="font-semibold">Description</p>
              <p id="description">
                {element.description || "No description provided."}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { FormSummary };
