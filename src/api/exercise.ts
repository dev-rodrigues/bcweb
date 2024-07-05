import { api } from '@/lib/axios.ts'
import { GetMemberType } from '@/types/commom-member.ts'
import { ExerciseFormType, GetExercisesType } from '@/types/common-exercise.ts'
import { GetExerciseMuscleGroupType } from '@/types/common-exercise-muscle-group-type.ts'
import { GetExerciseTypeType } from '@/types/common-exercise-type.ts'

export const getExercisePaged = async (
  page: number,
  size: number,
): Promise<GetExercisesType> => {
  const { data: response } = await api.get<GetExercisesType>(
    `/exercises/page/${page}/size/${size}`,
  )

  return response
}

export const getExerciseType = async (): Promise<GetExerciseTypeType[]> => {
  const { data: response } =
    await api.get<GetExerciseTypeType[]>(`/exercise-types`)
  return response
}

export const getExerciseMuscleGroup = async (): Promise<
  GetExerciseMuscleGroupType[]
> => {
  const { data: response } =
    await api.get<GetExerciseMuscleGroupType[]>(`/muscle-group`)

  return response
}

export const getExerciseMuscleGroupFilter = async (
  filter: string | undefined,
): Promise<GetExerciseMuscleGroupType[]> => {
  const { data: response } = await api.get<GetExerciseMuscleGroupType[]>(
    `/muscle-group/${filter}`,
  )

  return response
}

export const getMembers = async (): Promise<GetMemberType[]> => {
  const { data: response } = await api.get<GetMemberType[]>(`/bodily-member`)

  return response
}

export const createExercise = async (data: ExerciseFormType): Promise<void> => {
  await api.post('/exercise', data)
}

export const deleteExercise = async (id: number): Promise<void> => {
  await api.delete(`/exercise/${id}`)
}
