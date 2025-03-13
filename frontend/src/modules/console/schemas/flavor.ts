import { z } from "zod";

export const FlavorSchema = z.enum(["MONGO", "ORACLE", "POSTGRES", "MYSQL"]);
export type Flavor = z.infer<typeof FlavorSchema>;
