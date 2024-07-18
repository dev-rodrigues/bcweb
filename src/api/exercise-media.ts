import { api } from '@/lib/axios.ts'
import { UploadedFile } from '@/pages/app/exercise-file'

export interface ResponseAccess {
  id: number
  fileKey: string
  fileName: string
  contentType: string
  customerId: number
  exerciseId: number
  accessUrl: string
}

export interface ResponseExerciseMedia {
  id: number
  fileKey: string
  fileName: string
}

export interface ResponseExerciseMethod {
  id: number
  name: string
  goal: string
  description: string
}

export interface ResponseSelectedExercise {
  id: number
  name: string
  repetitions: number
  rest: number
  series: number
  weight: number
  exerciseMethodId: number
  selected: number
}

export const postExerciseMedia = async (
  uploadedFile: UploadedFile,
  customerId: number,
  exerciseId: number,
): Promise<ResponseAccess> => {
  const { data: response } = await api.post<ResponseAccess>('/exercise-media', {
    fileName: uploadedFile.name,
    contentType: uploadedFile.type,
    customerId,
    exerciseId,
  })

  return response
}

export const getExerciseMedia = async (
  customerId: number,
  exerciseId: number,
): Promise<ResponseExerciseMedia[]> => {
  const { data: response } = await api.get<ResponseExerciseMedia[]>(
    `/exercise-media/${customerId}/${exerciseId}`,
  )
  return response
}

export const getExerciseMethod = async (): Promise<
  ResponseExerciseMethod[]
> => {
  const { data: response } =
    await api.get<ResponseExerciseMethod[]>('/exercise-methods')
  return response
}

export const getExerciseSelectedByCustomerPhasingId = async (
  id: number,
): Promise<ResponseSelectedExercise[]> => {
  const { data: response } = await api.get<ResponseSelectedExercise[]>(
    `/customer-phasing-exercise/${id}`,
  )
  return response
}
