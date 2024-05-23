import { useQuery } from '@tanstack/react-query'

import { getCustomerPhasing } from '@/api/phasing.ts'

export function useCustomerPhasing(userId: number) {
  return useQuery({
    queryKey: ['customer-phasing', userId],
    queryFn: () => getCustomerPhasing(userId),
  })
}
