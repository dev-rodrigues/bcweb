import { api } from '@/lib/axios.ts'
import { ContentUserSchemaType } from '@/types/common-user.ts'

export const getUser = async (): Promise<ContentUserSchemaType> => {
  const { data: response } = await api.get('/me')
  return response
}
