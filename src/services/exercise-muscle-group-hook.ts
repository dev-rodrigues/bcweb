import { useQuery } from '@tanstack/react-query'

import {
  getExerciseMuscleGroup,
  getExerciseMuscleGroupFilter,
  getMembers,
} from '@/api/exercise.ts'

export function useExerciseMuscleGroup(filter: string | undefined) {
  const queryKey = filter
    ? ['exercise-muscle-group', filter]
    : ['exercise-muscle-group']
  const queryFn = filter
    ? () => getExerciseMuscleGroupFilter(filter)
    : () => getExerciseMuscleGroup()

  return useQuery({
    queryKey,
    queryFn,
  })
}

export function useMember() {
  return useQuery({
    queryKey: ['members'],
    queryFn: () => getMembers(),
  })
}
