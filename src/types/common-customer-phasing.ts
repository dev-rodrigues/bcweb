import { z } from 'zod'

export const GetCustomerPhasingType = z.object({
  id: z.number(),
  name: z.string(),
})

export type GetCustomerPhasingType = z.infer<typeof GetCustomerPhasingType>
