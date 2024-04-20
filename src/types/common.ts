import { z } from 'zod'

export const PageableSchema = z.object({
  pageNumber: z.number(),
  pageSize: z.number(),
  sort: z.array(z.unknown()),
  offset: z.number(),
  paged: z.boolean(),
  unpaged: z.boolean(),
})

export const localStorageName = '@bc.token'
