import { z } from "zod";

export const elementEditorSchema = z
  .object({
    label: z.string().min(1, { message: "Label is required" }),
    name: z.string().optional(),
    description: z.string().optional(),
    useLabelAsName: z.boolean(),
  })
  .refine((data) => data.useLabelAsName && !data.name, {
    message: "Name is required when using not label as name",
    path: ["name"],
  });

export type ElementEditorFormData = z.infer<typeof elementEditorSchema>;
