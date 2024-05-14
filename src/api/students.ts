import { api } from '@/lib/axios.ts'
import { GetStudentTypeType } from '@/types/common-students.ts'

export const getStudents = async (): Promise<GetStudentTypeType[]> => {
  const { data: response } = await api.get('/students')
  return response
}
