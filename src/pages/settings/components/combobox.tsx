import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExternalComponentViewer } from "./external-component-viewer";
import { useSetting } from "./useSetting";
import { settings } from "@/lib/settings";
import { EXPORTED_COMBOBOX_CODE } from "@/components/exported-components/combobox";

export const Combobox = () => {
  const [combobox, setCombobox] = useSetting(settings.CUSTOM_COMBOBOX);

  return (
    <div className="flex items-center justify-between space-y-0 rounded-md border p-4">
      <div className="flex items-center space-x-3">
        <Checkbox
          id="use-custom-combobox"
          checked={combobox}
          onCheckedChange={(checked) => setCombobox(!!checked)}
        />
        <Label htmlFor="use-custom-combobox" className="space-y-1 leading-none">
          <p>Use custom combobox component</p>
          <p className="font-normal text-muted-foreground">
            An implementation of shadcn/ui's combobox component using a Command
            and a Popover
          </p>
        </Label>
      </div>
      <ExternalComponentViewer
        title="Combobox"
        description="An implementation of recommended Command, Popover approach"
        componentCode={EXPORTED_COMBOBOX_CODE}
      />
    </div>
  );
};
