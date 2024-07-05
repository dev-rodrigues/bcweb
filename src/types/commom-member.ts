import { z } from 'zod'

export const GetMember = z.object({
  id: z.number(),
  name: z.string(),
})

export type GetMemberType = z.infer<typeof GetMember>
