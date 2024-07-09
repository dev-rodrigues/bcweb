import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import { SearchExerciseResponse } from '@/pages/app/training/wip/BuildTryingSearchExercises.tsx'

interface Props {
  data: SearchExerciseResponse[]
  handleRemoveExercise: (index: number) => void
}

export function TabSelectedExerciseTable({ data }: Props) {
  return (
    <Table overflow="scroll">
      <Thead>
        <Th textAlign={'center'}>Id</Th>
        <Th textAlign={'center'}>Exercise</Th>
        <Th textAlign={'center'}>Actions</Th>
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
            <Td></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
