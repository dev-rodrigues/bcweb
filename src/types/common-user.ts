import { z } from 'zod'

const ContentItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  teamName: z.string(),
  service: z.number(),
  status: z.string(),
  createdAt: z.string(),
  profiles: z.array(z.number()),
  password: z.string(),
  phone: z.string(),
  email: z.string(),
})

export type ContentUserSchemaType = z.infer<typeof ContentItemSchema>
