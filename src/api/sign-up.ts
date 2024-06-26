import { api } from '@/lib/axios.ts'
import { ContentUserSchemaType } from '@/types/common-user.ts'
import { SignUpFormType } from '@/types/commons-signup.ts'

export const createTeam = async (data: SignUpFormType): Promise<void> => {
  delete api.defaults.headers.common.Authorization

  const { data: response } = await api.post('/sign-up/team', {
    teamName: data.teamName,
    managerName: data.managerName,
    phone: data.phone,
    email: data.email.toLowerCase(),
    service: data.service,
    password: data.password,
  })
  return response.data
}

export const updateProfile = async (
  data: ContentUserSchemaType,
): Promise<void> => {
  console.log(data)
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
