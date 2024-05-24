import { z } from 'zod'

export const GetCustomerPhasingType = z.object({
  id: z.number(),
  name: z.string(),
})

export type GetCustomerPhasingType = z.infer<typeof GetCustomerPhasingType>

export const PostCustomerPhasing = z.object({
  id: z.number(),
  phasings: z.array(GetCustomerPhasingType),
})

export type PostCustomerPhasingType = z.infer<typeof PostCustomerPhasing>
