import { Container, Td, Tr, useBreakpointValue } from '@chakra-ui/react'
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
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

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
    <Tr
      key={key}
      border={'hidden'}
      borderColor={'rgba(0, 0, 0, 0.4)'}
      _hover={{
        transform: 'scale(1.05)',
        transition: 'transform 0.3s',
        opacity: 0.4,
      }}
    >
      {isDrawerSidebar ? null : (
        <Td>
          <Button>
            <Search className="h-3 w-3" />
          </Button>
        </Td>
      )}

      <Td>{data.id}</Td>

      {isDrawerSidebar ? null : (
        <Td textAlign={'center'}>{calculateTimeDifference(data.createdAt)}</Td>
      )}

      <Td textAlign={'center'}>{data.status}</Td>

      <Td textAlign={'center'}>{data.name}</Td>

      {isDrawerSidebar ? null : (
        <Td>
          <Container
            display="flex"
            flexDirection={{
              base: 'column',
              lg: 'row',
            }}
            justifyContent="center"
            alignItems="center"
          >
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
          </Container>
        </Td>
      )}
    </Tr>
  )
}
