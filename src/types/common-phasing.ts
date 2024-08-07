import { z } from 'zod'

export const GetPhasingType = z.object({
  id: z.number(),
  phasingId: z.number(),
  name: z.string(),
})

export type Phasing = z.infer<typeof GetPhasingType>
