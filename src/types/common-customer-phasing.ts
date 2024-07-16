import { z } from 'zod'

export const GetCustomerPhasing = z.object({
  id: z.number(),
  phasingId: z.number(),
  name: z.string(),
})

export type GetCustomerPhasingType = z.infer<typeof GetCustomerPhasing>

export const PostCustomerPhasing = z.object({
  id: z.number(),
  phasings: z.array(GetCustomerPhasing),
})

export type PostCustomerPhasingType = z.infer<typeof PostCustomerPhasing>
