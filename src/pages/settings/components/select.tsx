import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExternalComponentViewer } from "./external-component-viewer";
import { EXPORTED_SELECT_CODE } from "@/components/exported-components/select";
import { useSetting } from "./useSetting";

export const Select = () => {
  const [select, setSelect] = useSetting("use-custom-select");

  return (
    <div className="flex items-center justify-between space-y-0 rounded-md border p-4">
      <div className="flex items-center space-x-3">
        <Checkbox
          id="use-custom-select"
          checked={select}
          onCheckedChange={(checked) => setSelect(!!checked)}
        />
        <Label htmlFor="use-custom-select" className="space-y-1 leading-none">
          <p>Use custom select component</p>
        </Label>
      </div>
      <ExternalComponentViewer
        title="Select"
        description="A simple abstraction on the existing shadcn/ui components"
        componentCode={EXPORTED_SELECT_CODE}
      />
    </div>
  );
};