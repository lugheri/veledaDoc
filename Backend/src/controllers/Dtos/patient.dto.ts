import {z} from 'zod';

export const PatientInformationDTO = z.object({ 
  clinic_id:z.optional(z.number()),
  admission_date:z.optional(z.string()),
  name:z.optional(z.string()),  
  gender:z.optional(z.string()),
  observations:z.optional(z.string()),
  status:z.optional(z.literal(1).or(z.literal(0))).default(1),
})
export type PatientInformationType = z.infer<typeof PatientInformationDTO>

export const PatientPersonalDataDTO = z.object({ 
  patient_id:z.optional(z.number()),    
  age:z.optional(z.number()),
})
export type PatientPersonalDataType = z.infer<typeof PatientPersonalDataDTO>