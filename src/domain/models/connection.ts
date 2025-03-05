import { z } from "zod";
import { FlavorSchema } from "./flavor";

export const ConnectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  flavor: FlavorSchema,
  console: z.string().nullable(),
});

export type Connection = z.infer<typeof ConnectionSchema>;
