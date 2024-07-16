import { useQuery } from '@tanstack/react-query'

import { getCustomerPhasing } from '@/api/phasing.ts'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

export function useCustomerPhasing(userId: number) {
  return useQuery<GetCustomerPhasingType[]>({
    queryKey: ['customer-phasing', userId],
    queryFn: () => getCustomerPhasing(userId),
  })
}
