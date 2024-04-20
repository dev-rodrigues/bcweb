import { z } from 'zod'

export const GetExerciseMuscleGroupType = z.object({
  id: z.number(),
  name: z.string(),
})

export type GetExerciseMuscleGroupType = z.infer<
  typeof GetExerciseMuscleGroupType
>
