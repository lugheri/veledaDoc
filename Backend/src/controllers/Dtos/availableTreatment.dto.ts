import {z} from 'zod';

export const AvailableTreatmentsDTO = z.object({
  name:z.optional(z.string()),
  description:z.optional(z.string()),
  clausule:z.optional(z.string()),
  status:z.optional(z.literal(1).or(z.literal(0))).default(1)
})
export type AvailableTreatmentsType = z.infer<typeof AvailableTreatmentsDTO>