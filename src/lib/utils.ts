import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase(),
    )
    .replace(/\s+/g, "");
}

export function parseValue(value: string, type: string) {
  if (type === "number") {
    const number = parseFloat(value);

    if (isNaN(number)) {
      return undefined;
    }

    return number;
  }

  return value;
}
