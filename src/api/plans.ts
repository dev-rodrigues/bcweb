import { api } from '@/lib/axios.ts'
import { ContentPlanSchemaType, PlanFormType } from '@/types/common-plan.ts'

export const getPlans = async (): Promise<ContentPlanSchemaType[] | []> => {
  const { data: response } = await api.get<ContentPlanSchemaType[]>('/plans')
  return response
}

export const createPlan = async (data: PlanFormType): Promise<void> => {
  console.log(data)
  await api.post('/plans', data)
}
