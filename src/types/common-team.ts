import { z } from 'zod'

import { PageableSchema } from '@/types/common.ts'

// Definição da interface para o dono (owner)
const OwnerSchema = z.object({
  id: z.number(),
  name: z.string(),
  customerPhone: z.string(),
  customerEmail: z.string(),
  customerEmailValidated: z.boolean(),
})

// Definição da interface para cada item de conteúdo (content item)
const ContentItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  service: z.number(),
  status: z.string(),
  createdAt: z.string(),
  owner: OwnerSchema,
})

export const GetTeam = z.object({
  total: z.number(),
  content: z.array(ContentItemSchema),
  pageable: PageableSchema,
  pageNumber: z.number(),
})

export type GetTeamType = z.infer<typeof GetTeam>
export type ContentItemSchemaType = z.infer<typeof ContentItemSchema>
