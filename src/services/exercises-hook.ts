import { useQuery } from '@tanstack/react-query'

import { getExercisePaged } from '@/api/exercise.ts'

export function useExercises(page: number, size: number) {
  return useQuery({
    queryKey: ['exercise-paged', page, size],
    queryFn: () => getExercisePaged(page, size),
  })
}
