import { z } from "zod";
import md5 from 'md5';
//Auth 
export const UserAccessDTO = z.object({
  username: z.string(),
  password: z.string().min(5,'A senha deve ter mais de 5 dígitos'),
});
export type UserAccessType = z.infer<typeof UserAccessDTO>;

//USERS
export const UserDataDTO = z.object({
  name:z.string(),
  username:z.string(),
  mail:z.optional(z.string()),
  credential: z.number(),
  team_id: z.optional(z.number()).default(0),
  password:z.string().transform(v=>md5(v)),
  reset: z.optional(z.number()).default(1),
  logged: z.optional(z.number()).default(0),
  status: z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type UserDataType = z.infer<typeof UserDataDTO>;
export const UserDataPartialDTO = UserDataDTO.partial();
export type UserDataPartialType = z.infer<typeof UserDataPartialDTO>;

export const PaginationUserDTO = z.object({
  status: z.optional(z.literal(1).or(z.literal(0))).default(1),
  page: z.optional(z.number()).default(1),
  order: z.optional(z.enum(['ASC','DESC'])).default('ASC'),
  orderedBy: z.optional(z.string()).default('id'),
})  
export type PaginationUserType = z.infer<typeof PaginationUserDTO>;

export const SearchUserDTO = z.object({
  params: z.string(),
  value:z.string(),
  status: z.optional(z.literal(1).or(z.literal(0))).default(1),
  page: z.optional(z.number()).default(1),
  order: z.optional(z.enum(['ASC','DESC'])).default('ASC'),
  orderedBy: z.optional(z.string()).default('id'),
})
export type SearchUserType = z.infer<typeof SearchUserDTO>


//TEAMS
export const TeamDataDTO = z.object({
  name:z.string(),
  description:z.optional(z.string()).default('Sem Descrição'),
  status:z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type TeamDataType = z.infer<typeof TeamDataDTO>

export const TeamDataPartialDTO = TeamDataDTO.partial();
export type TeamDataPartialType = z.infer<typeof TeamDataPartialDTO>


