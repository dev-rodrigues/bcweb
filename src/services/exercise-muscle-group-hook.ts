import { useQuery } from '@tanstack/react-query'

import { getExerciseMuscleGroup } from '@/api/exercise.ts'

export function useExerciseMuscleGroup() {
  return useQuery({
    queryKey: ['exercise-muscle-group'],
    queryFn: () => getExerciseMuscleGroup(),
  })
}
