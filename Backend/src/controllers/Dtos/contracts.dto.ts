import {z} from 'zod';

export const ContractDTO = z.object({
  date:z.optional(z.string()),
  name:z.optional(z.string()),
  description:z.optional(z.string()),
  status:z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type ContractType = z.infer<typeof ContractDTO>

export const ComponentContractDTO = z.object({
  contract_id:z.optional(z.number()),
  title:z.optional(z.string()),
  type:z.optional(z.string()),
  content:z.optional(z.string()),
  image:z.optional(z.number()),
  order:z.optional(z.number()).default(0),
  status:z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type ComponentContractType = z.infer<typeof ComponentContractDTO>

