import { useQuery } from '@tanstack/react-query'

import { getPlans } from '@/api/plans.ts'

export function usePlans() {
  return useQuery({
    queryKey: ['plans'],
    queryFn: () => getPlans(),
  })
}
