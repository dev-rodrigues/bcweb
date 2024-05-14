import { useQuery } from '@tanstack/react-query'

import { getStudents } from '@/api/students.ts'

export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: () => getStudents(),
  })
}
