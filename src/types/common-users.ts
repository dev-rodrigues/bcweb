import { z } from 'zod'

import { PageableSchema } from '@/types/common.ts'

export const ContentItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  roles: z.array(z.string()),
  email: z.string(),
  phone: z.string(),
  customerEmailValidated: z.boolean(),
})

export const GetUsers = z.object({
  total: z.number(),
  content: z.array(ContentItemSchema),
  pageable: PageableSchema,
  pageNumber: z.number(),
})

export type GetUsersType = z.infer<typeof GetUsers>
export type ContentItemSchemaType = z.infer<typeof ContentItemSchema>
