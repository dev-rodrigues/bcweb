import { useQuery } from '@tanstack/react-query'

import { getExercisePaged } from '@/api/exercise.ts'
import {
  getExerciseMedia,
  getExerciseMethod,
  getExerciseSelectedByCustomerPhasingId,
} from '@/api/exercise-media.ts'

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

export function useExerciseMethod() {
  return useQuery({
    queryKey: ['exercise-method'],
    queryFn: () => getExerciseMethod(),
  })
}

export function useExerciseSelectedByCustomerPhasingId(
  customerPhasingId: number,
) {
  return useQuery({
    queryKey: ['exercise-selected-by-customer-phasing-id', customerPhasingId],
    queryFn: () => getExerciseSelectedByCustomerPhasingId(customerPhasingId),
  })
}
