import {z} from 'zod';

export const ProfessionalDTO = z.object({ 
  clinic_id:z.optional(z.number()),
  date:z.optional(z.string()),
  photo:z.optional(z.number()),
  name:z.optional(z.string()),
  status:z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type ProfessionalType = z.infer<typeof ProfessionalDTO>