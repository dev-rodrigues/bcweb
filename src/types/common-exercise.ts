import { z } from 'zod'

import { PageableSchema } from '@/types/common.ts'

const ContentItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  typeId: z.number(),
  typeName: z.string(),
})

export const GetExercises = z.object({
  total: z.number(),
  content: z.array(ContentItemSchema),
  pageable: PageableSchema,
  pageNumber: z.number(),
})

export type GetExercisesType = z.infer<typeof GetExercises>
export type ContentItemSchemaType = z.infer<typeof ContentItemSchema>

export const ExerciseForm = z.object({
  name: z.string(),
  type: z.string(),
  groups: z.array(z.number()),
})

export type ExerciseFormType = z.infer<typeof ExerciseForm>
