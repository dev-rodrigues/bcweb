import { Container, Td, Tr, useBreakpointValue } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Cog, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { deleteExercise } from '@/api/exercise.ts'
import { Button } from '@/components/ui/button.tsx'
import { queryClient } from '@/lib/react-query'
import { ContentItemSchemaType } from '@/types/common-exercise.ts'

type ExerciseTableRowProps = {
  key: number
  data: ContentItemSchemaType
  currentPage: number
  onOpen: () => void
}

export function ExerciseTableRow({ data, currentPage, onOpen }: ExerciseTableRowProps) {
  const navigate = useNavigate()

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  const [onExcluding, setOnExcluding] = useState(false)

  const mutation = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['exercise-paged', currentPage, 10],
        })
        .then(() => {
          toast.success('Exercise successfully deleted')
        })
        .finally(() => {
          setOnExcluding(false)
        })
    },
  })

  const onSubmit = () => {
    setOnExcluding(true)
    mutation.mutate(data.id)
  }

  const navigateToMedia = (data: ContentItemSchemaType) => {
    navigate(`/exercise-files/${data.id}`, { state: { data } })
  }

  return (
    <Tr>
      {isDrawerSidebar ? null : (
        <Td>
          <Button onClick={onOpen}>
            <Search className="h-3 w-3" />
          </Button>
        </Td>
      )}

      {!isDrawerSidebar && <Td>{data.id}</Td>}

      <Td>{data.name}</Td>

      <Td>
        <Container
          gap={2}
          display="flex"
          flexDirection={{
            base: 'column',
            lg: 'row',
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            disabled={onExcluding}
            variant="outline"
            onClick={() => onSubmit()}
          >
            <Trash2 className="h-3 w-3" />
          </Button>

          

          <Button onClick={() => navigateToMedia(data)}>
            <Cog className="h-4 w-4" />
          </Button>
        </Container>
      </Td>
    </Tr>
  )
}
