import { z } from "zod";

export const UserConnectionsDtoSchema = z.object({
  user: z.string(),
  connections: z.array(z.object({
    id: z.string(),
    name: z.string(),
    flavor: z.enum(["MONGO", "ORACLE", "POSTGRES", "MYSQL"]),
    favorite:z.boolean().default(false)
  })),
});
  
export type UserConnectionsDto = z.infer<typeof UserConnectionsDtoSchema>;
