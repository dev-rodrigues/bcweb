import { api } from '@/lib/axios.ts'
import { GetTeamType, GetTopTeamsType } from '@/types/common-team.ts'

export const getTeamPaged = async (
  page: number,
  size: number,
): Promise<GetTeamType> => {
  const { data: response } = await api.get(`/teams/page/${page}/size/${size}`)
  return response
}

export const getTop5Teams = async (): Promise<GetTopTeamsType[]> => {
  const { data: response } = await api.get<GetTopTeamsType[]>(`/teams/top5`)
  return response
}
