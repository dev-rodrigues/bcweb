import { api } from '@/api/api.ts'
import { GetTeamType } from '@/types/common-team.ts'

export const getTeamPaged = async (
  page: number,
  size: number,
): Promise<GetTeamType> => {
  const { data: response } = await api.get(`/teams/page/${page}/size/${size}`)
  return response
}
