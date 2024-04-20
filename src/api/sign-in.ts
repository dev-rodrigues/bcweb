import { AxiosResponse } from 'axios'

import { api } from '@/api/api.ts'

export interface SignInBody {
  login: string
  password: string
}

export async function signIn({
  login,
  password,
}: SignInBody): Promise<AxiosResponse> {
  return await api.post('/auth/login', { login, password })
}
