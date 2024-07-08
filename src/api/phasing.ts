import { api } from '@/lib/axios.ts'
import {
  GetCustomerPhasingType,
  PostCustomerPhasingType,
} from '@/types/common-customer-phasing.ts'
import { Phasing } from '@/types/common-phasing.ts'

export const getCustomerPhasing = async (
  userId: number,
): Promise<GetCustomerPhasingType[]> => {
  const { data: response } = await api.get<GetCustomerPhasingType[] | []>(
    `/customer-phasing/student/${userId}`,
  )

  return response
}

export const getPhasing = async (): Promise<Phasing[]> => {
  const { data: response } = await api.get<Phasing[] | []>(`/phasing`)

  return response
}

export const postPhasingByCustomer = async (
  data: PostCustomerPhasingType,
): Promise<void> => {
  await api.post(`/customer-phasing`, data)
}

export const deletePhasingByCustomer = async (id: number): Promise<void> => {
  await api.delete(`/customer-phasing/${id}`)
}
