import { z } from "zod";

export const MemberDtoSchema = z.object({
    id: z.string(),
    name: z.string()
});

export const MembersDtoSchema = z.array(MemberDtoSchema)
  
export type MemberDto = z.infer<typeof MemberDtoSchema>;
export type MembersDto = z.infer<typeof MembersDtoSchema>;
