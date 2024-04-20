import { useQuery } from '@tanstack/react-query'

import { getTeamPaged } from '@/api/teams.ts'

export function useTeamPaged(page: number, size: number) {
  return useQuery({
    queryKey: ['team-paged'],
    queryFn: () => getTeamPaged(page, size),
  })
}
