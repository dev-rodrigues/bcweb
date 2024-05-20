import { z } from 'zod'

export const createPlanForm = z.object({
  type: z.string(),
  price: z.string(),
})

export const ContentPlanSchema = z.object({
  id: z.number(),
  type: z.string(),
  price: z.string(),
  offers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      lineThrough: z.boolean(),
    }),
  ),
})

export type PlanFormType = z.infer<typeof createPlanForm>
export type ContentPlanSchemaType = z.infer<typeof ContentPlanSchema>
