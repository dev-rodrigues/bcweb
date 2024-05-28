import { Button, HStack, Td, Tr } from '@chakra-ui/react'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { ContentItemSchemaType } from '@/types/common-exercise.ts'

type Props = {
  key: number
  data: ContentItemSchemaType
  handleAddExercise: (exercise: ContentItemSchemaType) => void
}

export function ExerciseSelectTableRow({
  key,
  data,
  handleAddExercise,
}: Props) {
  return (
    <Tr
      key={key}
      _hover={{
        transform: 'scale(1.02)',
        transition: 'transform 0.3s',
      }}
    >
      <Td>{data.id}</Td>
      <Td>{data.name}</Td>
      <Td>
        <HStack>
          <Button
            onClick={() => {
              toast.info(`Exercise ${data.name} added`, {
                position: 'top-center',
              })
              handleAddExercise(data)
            }}
          >
            <PlusIcon />
          </Button>
        </HStack>
      </Td>
    </Tr>
  )
}
