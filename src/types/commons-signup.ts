import { z } from 'zod'

export const SignUpForm = z.object({
  teamName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  service: z.string(),
  password: z.string().min(6),
})

export type SignUpFormType = z.infer<typeof SignUpForm>
