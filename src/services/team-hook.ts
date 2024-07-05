import { useQuery } from '@tanstack/react-query'

import { getTeamPaged, getTop5Teams } from '@/api/teams.ts'

export function useTeamPaged(page: number, size: number) {
  return useQuery({
    queryKey: ['team-paged'],
    queryFn: () => getTeamPaged(page, size),
  })
}

export function useTop5Teams() {
  return useQuery({
    queryKey: ['top-5-teams'],
    queryFn: () => getTop5Teams(),
  })
}
