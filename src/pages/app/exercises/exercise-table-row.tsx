import { Container, Td, Tr, useBreakpointValue } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Cog, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { deleteExercise } from '@/api/exercise.ts'
import { queryClient } from '@/app.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ContentItemSchemaType } from '@/types/common-exercise.ts'

type ExerciseTableRowProps = {
  key: number
  data: ContentItemSchemaType
  currentPage: number
}

export function ExerciseTableRow({
  key,
  data,
  currentPage,
}: ExerciseTableRowProps) {
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
    <Tr
      border={'solid'}
      borderColor={'rgba(0, 0, 0, 0.4)'}
      key={key}
      _hover={{
        transform: 'scale(1.05)',
        transition: 'transform 0.3s',
        opacity: 0.4,
      }}
    >
      {!isDrawerSidebar && <Td style={{ textAlign: 'center' }}>{data.id}</Td>}

      <Td style={{ textAlign: 'center' }}>{data.name}</Td>

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
            <Trash2 className="mr-2 h-3 w-3" />
          </Button>

          <Button>
            <Search className="h-3 w-3" />
          </Button>

          <Button onClick={() => navigateToMedia(data)}>
            <Cog className="h-4 w-4" />
          </Button>
        </Container>
      </Td>
    </Tr>
  )
}
