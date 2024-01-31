import {z} from 'zod';

export const ProcedureDTO = z.object({ 
  clinic_id:z.optional(z.number()),
  type_treatment:z.optional(z.number()),
  name:z.optional(z.string()),
  description:z.optional(z.string()),
  professional_id:z.optional(z.number()),
  status:z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type ProcedureType = z.infer<typeof ProcedureDTO>