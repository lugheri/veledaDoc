import {z} from 'zod';

export const ProfessionalDTO = z.object({ 
  clinic_id:z.optional(z.number()),
  hire_date:z.optional(z.string()),
  termination_date:z.optional(z.string()),
  photo:z.optional(z.number()),
  name:z.optional(z.string()),
  birth_date:z.optional(z.string()),
  gender:z.optional(z.string()),
  marital_status:z.optional(z.string()),
  crm:z.optional(z.string()),
  document_type:z.optional(z.string()),
  document:z.optional(z.string()),
  number_cell:z.optional(z.string()),
  number_phone:z.optional(z.string()),
  number_additional:z.optional(z.string()),
  email:z.optional(z.string()),
  status:z.optional(z.literal(1).or(z.literal(0))).default(1),

})
export type ProfessionalType = z.infer<typeof ProfessionalDTO>