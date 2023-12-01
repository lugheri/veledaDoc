import { z } from "zod";

//LEVELS
export const LevelDataDTO = z.object({
  name:z.string(),
  description: z.optional(z.string()).default('Sem Descrição'),
  status: z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type LevelDataType = z.infer<typeof LevelDataDTO>;
//PARTIAL
export const LevelDataPartialDTO = LevelDataDTO.partial();
export type LevelDataPartialType = z.infer<typeof LevelDataPartialDTO>;

//CREDENTIALS
export const CredentialDataDTO = z.object({
  name:z.string(),
  level_id: z.number(),
  description: z.optional(z.string()).default('Sem Descrição'),
  status: z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type CredentialDataType = z.infer<typeof CredentialDataDTO>;
//PARTIAL
export const CredentialDataPartialDTO = CredentialDataDTO.partial();
export type CredentialDataPartialType = z.infer<typeof CredentialDataPartialDTO>;

//POLICIES
export const PolicyDataDTO = z.object({
  level_id: z.number(),
  module_id: z.number(),
  parent_module_id: z.optional(z.number()).default(0),
  active: z.optional(z.literal(1).or(z.literal(0))).default(1),
  status: z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type PolicyDataType = z.infer<typeof PolicyDataDTO>;
//PARTIAL
export const PolicyDataPartialDTO = PolicyDataDTO.partial();
export type PolicyDataPartialType = z.infer<typeof PolicyDataPartialDTO>;

