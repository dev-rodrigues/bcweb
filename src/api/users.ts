import { api } from '@/api/api.ts'
import { GetUsersType } from '@/types/common-users.ts'

export const getUsersPaged = async (
  page: number,
  size: number,
): Promise<GetUsersType> => {
  return (await api.get(`/users/page/${page}/size/${size}`)).data
}
