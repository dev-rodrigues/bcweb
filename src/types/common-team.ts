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

export const GetTopTeams = z.object({
  registered: z.number(),
  teamId: z.number(),
  customerId: z.number(),
  customerPhone: z.string().optional(),
  customerName: z.string(),
  customerAvatar: z.string().optional(),
})

export const GetGrowth = z.object({
  totalTimesLastMonth: z.number(),
  totalTimesCurrentMonth: z.number(),
  totalTimes: z.number(),
  percentileChange: z.number(),
})

export type GetTeamType = z.infer<typeof GetTeam>
export type ContentItemSchemaType = z.infer<typeof ContentItemSchema>
export type GetTopTeamsType = z.infer<typeof GetTopTeams>
export type GetGrowthType = z.infer<typeof GetGrowth>
