import { z } from 'zod'

export const GetExerciseType = z.object({
  id: z.number(),
  name: z.string(),
})

export type GetExerciseTypeType = z.infer<typeof GetExerciseType>
