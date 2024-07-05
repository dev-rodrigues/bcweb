import { useQuery } from '@tanstack/react-query'

import { getGrowth } from '@/api/growth.ts'

export function useGrowth() {
  return useQuery({
    queryKey: ['growth'],
    queryFn: () => getGrowth(),
  })
}
