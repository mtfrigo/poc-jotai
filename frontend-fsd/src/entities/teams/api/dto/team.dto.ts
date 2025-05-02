import { z } from "zod";

export const TeamDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  members: z.array(z.object({
    id: z.string(),
    name: z.string()
  }))
});

export const TeamsDtoSchema = z.array(TeamDtoSchema)
  
export type TeamDto = z.infer<typeof TeamDtoSchema>;
export type TeamsDto = z.infer<typeof TeamsDtoSchema>;
