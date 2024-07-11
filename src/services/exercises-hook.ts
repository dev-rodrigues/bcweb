import { useQuery } from '@tanstack/react-query'

import { getExercisePaged } from '@/api/exercise.ts'
import { getExerciseMedia } from '@/api/exercise-media.ts'

export function useExercises(page: number, size: number) {
  return useQuery({
    queryKey: ['exercise-paged', page, size],
    queryFn: () => getExercisePaged(page, size),
  })
}

export function useExerciseMedia(customerId: number, exerciseId: number) {
  return useQuery({
    queryKey: ['exercise-media', customerId, exerciseId],
    queryFn: () => getExerciseMedia(customerId, exerciseId),
  })
}
