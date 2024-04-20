import { useQuery } from '@tanstack/react-query'

import { getExerciseType } from '@/api/exercise.ts'

export function useExercisesType() {
  return useQuery({
    queryKey: ['exercise-type'],
    queryFn: () => getExerciseType(),
  })
}
