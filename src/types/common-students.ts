import { z } from 'zod'

export const GetStudentType = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  registration: z.number(),
})

export type GetStudentTypeType = z.infer<typeof GetStudentType>
