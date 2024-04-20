import { api } from '@/api/api.ts'
import { SignUpFormType } from '@/types/commons-signup.ts'

export const createTeam = async (data: SignUpFormType): Promise<void> => {
  const { data: response } = await api.post('/team/register', data)
  return response.data
}

export const updateStatus = async (
  teamId: number,
  newStatus: string,
): Promise<void> => {
  const { data: response } = await api.patch(`/teams/${teamId}`, {
    status: newStatus,
  })
  return response.data
}
