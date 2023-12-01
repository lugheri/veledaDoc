import {z} from 'zod';
export const CheckAccessDTO = z.object({
  moduleId: z.string().transform((value) => Number(value)),
  levelId: z.string().transform((value) => Number(value))
})

export const ModulesDTO = z.object({
  type:z.string(),
  moduleParentId: z.string().transform((value)=>Number(value)),
  levelId:z.string().transform((value)=>Number(value))
})
export type ModulesType = z.infer<typeof ModulesDTO>

export const SubModulesDTO = z.object({
  type: z.string(),
  module: z.string(),
  levelId: z.string().transform((value) => Number(value))
})
export type SubModulesType = z.infer<typeof SubModulesDTO>

//MODULES
export const ModuleDataDTO = z.object({
  name:z.string(),
  alias:z.string(),
  parent: z.number(),
  icon:z.string(),
  description:z.optional(z.string()),
  type: z.string(),
  order: z.number(),
  status: z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type ModuleDataType = z.infer<typeof ModuleDataDTO>;
//PARTIAL
export const ModuleDataPartialDTO = ModuleDataDTO.partial();
export type ModuleDataPartialType = z.infer<typeof ModuleDataPartialDTO>;