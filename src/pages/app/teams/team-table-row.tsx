import { Td, Tr } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'

import { updateStatus } from '@/api/sign-up.ts'
import { queryClient } from '@/app.tsx'
import { Button } from '@/components/ui/button.tsx'
import { calculateTimeDifference } from '@/types/common-date.ts'
import { ContentItemSchemaType } from '@/types/common-team.ts'

type TeamTableRowProps = {
  key: number
  data: ContentItemSchemaType
}

type UpdateTeamType = {
  status: string
}

export function TeamTableRow({ key, data }: TeamTableRowProps) {
  const mutation = useMutation({
    mutationFn: ({
      id,
      variables,
    }: {
      id: number
      variables: UpdateTeamType
    }) => updateStatus(id, variables.status),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['team-paged'],
        })
        .then(() => {
          console.log('Invalidate query')
        })
    },
  })

  const onStatusChange = (id: number, status: string) => {
    mutation.mutate({ id, variables: { status } })
  }

  return (
    <Tr key={key}>
      <Td>
        <Button className="w-fit" variant="outline">
          <Search className="h-3 w-3" />
        </Button>
      </Td>

      <Td>{data.id}</Td>

      <Td>{calculateTimeDifference(data.createdAt)}</Td>

      <Td>{data.status}</Td>

      <Td>{data.name}</Td>

      <Td>
        <Button
          variant="outline"
          onClick={() => onStatusChange(data.id, 'ACTIVE')}
        >
          <ArrowRight />
          Aprovar
        </Button>
        <Button
          variant="ghost"
          onClick={() => onStatusChange(data.id, 'BLOCKED')}
        >
          <X />
          Bloquear
        </Button>
      </Td>
    </Tr>
  )
}
