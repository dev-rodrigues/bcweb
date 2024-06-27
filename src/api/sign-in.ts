import { AxiosResponse } from 'axios'

import { api } from '@/lib/axios.ts'

export interface SignInBody {
  login: string
  password: string
}

export async function signIn({
  login,
  password,
}: SignInBody): Promise<AxiosResponse> {
  delete api.defaults.headers.common.Authorization
  return await api.post('/sessions', { login, password })
}
