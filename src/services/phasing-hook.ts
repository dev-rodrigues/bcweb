import { useQuery } from '@tanstack/react-query'

import { getPhasing } from '@/api/phasing.ts'

export function usePhasing() {
  return useQuery({
    queryKey: ['phasing'],
    queryFn: () => getPhasing(),
  })
}
