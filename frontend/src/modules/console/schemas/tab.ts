import { z } from "zod";

export const TabSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export type Tab = z.infer<typeof TabSchema>;
