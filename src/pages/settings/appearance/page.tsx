import { THEME_COLORS, useTheme } from "@/components/providers/theme-provider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export function AppearancePage() {
  const { theme, setTheme, color, setColor } = useTheme();
  console.log(color);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Select the theme of your app, and you can better picture how the forms
          will look.
        </p>
      </div>
      <Separator />
      <div className="space-y-1">
        <Label htmlFor="theme">Theme</Label>
        <p className="text-sm text-muted-foreground">
          This won't change how the code is generated, but you can change your
          theme for the form builder here.
        </p>
        <RadioGroup
          id="theme"
          onValueChange={setTheme}
          defaultValue={theme}
          className="grid max-w-md grid-cols-2 gap-8 pt-2"
        >
          <div>
            <Label className="[&:has([data-state=checked])>div]:border-primary">
              <RadioGroupItem value="light" className="sr-only" />
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Light
              </span>
            </Label>
          </div>
          <div>
            <Label className="[&:has([data-state=checked])>div]:border-primary">
              <RadioGroupItem value="dark" className="sr-only" />
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Dark
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <RadioGroup
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          defaultValue={color}
          onValueChange={setColor}
        >
          {THEME_COLORS.map((color) => (
            <Label
              className="[&:has([data-state=checked])>div]:border-primary"
              key={color.name}
            >
              <RadioGroupItem value={color.name} className="sr-only" />
              <div className="flex items-center gap-4 rounded-lg border bg-popover p-4 text-card-foreground shadow-sm">
                <div
                  className={`h-6 w-6 rounded-full`}
                  style={{ backgroundColor: color.value }}
                ></div>
                <div>{color.name}</div>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
