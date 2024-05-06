import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/api/me-user.ts'

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  })
}
