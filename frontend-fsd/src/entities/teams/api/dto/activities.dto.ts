import { z } from "zod";

export const ActivityDtoSchema = z.string();

export const ActivitiesDtoSchema = z.array(ActivityDtoSchema)
  
export type ActivityDto = z.infer<typeof ActivityDtoSchema>;
export type ActivitiesDto = z.infer<typeof ActivitiesDtoSchema>;
