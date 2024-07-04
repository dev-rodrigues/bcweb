import { Container, Td, Tr, useBreakpointValue } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
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
          toast.success('Exercício excluído com sucesso')
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

  return (
    <Tr key={key}>
      {!isDrawerSidebar && <Td>{data.id}</Td>}

      <Td>{data.name}</Td>

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
            disabled={onExcluding}
            variant="outline"
            onClick={() => onSubmit()}
          >
            <Trash2 className="mr-2 h-3 w-3" />
            {!isDrawerSidebar && <p>Excluir</p>}
          </Button>

          <Button variant="outline">
            <Search className="h-3 w-3" />
          </Button>
        </Container>
      </Td>
    </Tr>
  )
}
