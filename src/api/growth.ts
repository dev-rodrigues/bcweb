import { api } from '@/lib/axios.ts'
import { GetGrowthType } from '@/types/common-team.ts'

export const getGrowth = async (): Promise<GetGrowthType> => {
  const { data: response } = await api.get<GetGrowthType>(`/growth`)
  return response
}
