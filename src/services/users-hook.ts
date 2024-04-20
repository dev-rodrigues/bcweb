import { useQuery } from '@tanstack/react-query'

import { getUsersPaged } from '@/api/users.ts'

export function useUsers(page: number, size: number) {
  return useQuery({
    queryKey: ['user-paged', page, size],
    queryFn: () => getUsersPaged(page, size),
  })
}
