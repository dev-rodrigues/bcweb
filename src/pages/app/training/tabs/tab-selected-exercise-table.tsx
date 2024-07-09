import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { SearchExerciseResponse } from '@/pages/app/training/tabs/TabBuildTryingSearchExercises.tsx'

interface Props {
  data: SearchExerciseResponse[]
  handleRemoveExercise: (index: number) => void
}

export function TabSelectedExerciseTable({
  data,
  handleRemoveExercise,
}: Props) {
  return (
    <Table overflow="scroll">
      <Thead>
        <Tr>
          <Th textAlign={'center'}>Id</Th>
          <Th textAlign={'center'}>Exercise</Th>
          <Th textAlign={'center'}>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <Tr
            key={index}
            _hover={{
              transform: 'scale(1.02)',
              transition: 'transform 0.3s',
              backgroundColor: 'rgba(0, 0, 0, 1)',
            }}
          >
            <Td textAlign={'center'}>{item.id}</Td>
            <Td textAlign={'center'}>{item.name}</Td>
            <Td textAlign={'center'}>
              <Button
                type={'button'}
                onClick={() => handleRemoveExercise(index)}
              >
                <Trash className="h-3 w-3" />
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
