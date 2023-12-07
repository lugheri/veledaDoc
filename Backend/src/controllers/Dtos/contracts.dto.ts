import {z} from 'zod';

export const ContractDTO = z.object({
  date:z.optional(z.string()),
  name:z.optional(z.string()),
  description:z.optional(z.string()),
  status:z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type ContractType = z.infer<typeof ContractDTO>