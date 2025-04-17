import { z } from "zod";

export const FlavorSchema = z.enum(["MONGO", "ORACLE", "POSTGRES", "MYSQL"]);

export const ConnectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  flavor: FlavorSchema,
});

export type Flavor = z.infer<typeof FlavorSchema>;
export type Connection = z.infer<typeof ConnectionSchema>;
