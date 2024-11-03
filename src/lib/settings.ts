export const settings = {
  CUSTOM_SELECT: "use-custom-select",
  CUSTOM_DATE_PICKER: "use-custom-date-picker",
  CUSTOM_DATE_RANGE_PICKER: "use-custom-date-range-picker",
  CUSTOM_COMBOBOX: "use-custom-combobox",
} as const;

export type Setting = (typeof settings)[keyof typeof settings];
