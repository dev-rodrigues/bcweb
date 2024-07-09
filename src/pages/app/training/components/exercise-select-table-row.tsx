import { HStack, Td, Tr } from '@chakra-ui/react'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { SearchExerciseResponse } from '@/pages/app/training/wip/BuildTryingSearchExercises.tsx'

type Props = {
  id: number
  data: SearchExerciseResponse
  handleAddExercise: (exercise: SearchExerciseResponse) => void
}

export function ExerciseSelectTableRow({ id, data, handleAddExercise }: Props) {
  return (
    <Tr
      key={id}
      _hover={{
        transform: 'scale(1.02)',
        transition: 'transform 0.3s',
        brightness: '110%',
      }}
    >
      <Td>{data.id}</Td>
      <Td>{data.name}</Td>
      <Td>
        <HStack>
          <Button type={'button'} onClick={() => handleAddExercise(data)}>
            <PlusIcon className="h-2 w-2" />
          </Button>
        </HStack>
      </Td>
    </Tr>
  )
}
