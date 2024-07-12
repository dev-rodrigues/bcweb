import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { Settings, Trash } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button.tsx'
import { ConfigureTraining } from '@/pages/app/training/components/configure-training.tsx'
import { SearchExerciseResponse } from '@/pages/app/training/tabs/TabBuildTryingSearchExercises.tsx'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

interface Props {
  data: SearchExerciseResponse[]
  handleRemoveExercise: (index: number) => void
  phasing: GetCustomerPhasingType
}

export function TabSelectedExerciseTable({
  data,
  handleRemoveExercise,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [exercise, setExercise] = useState<SearchExerciseResponse | null>(null)

  function handleClose() {
    onClose()
    setExercise(null)
  }

  function handleOpen(exercise: SearchExerciseResponse) {
    setExercise(exercise)
    onOpen()
  }

  return (
    <>
      <ConfigureTraining
        isOpen={isOpen}
        onClose={handleClose}
        exercise={exercise}
      />
      <TableContainer
        borderColor={'rgba(0, 0, 0, 0.4)'}
        borderWidth={0.1}
        borderRadius={'5px'}
        px={10}
      >
        <Table overflow="scroll">
          <Thead>
            <Tr>
              <Th borderColor={'rgba(0, 0, 0, 0.4)'}>Id</Th>
              <Th borderColor={'rgba(0, 0, 0, 0.4)'}>Exercise</Th>
              <Th borderColor={'rgba(0, 0, 0, 0.4)'} textAlign={'center'}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr
                key={index}
                borderBottom={'solid'}
                borderColor={'rgba(0, 0, 0, 0.2)'}
                _hover={{
                  transform: 'scale(1.01)',
                  transition: 'transform 0.3s',
                  opacity: 0.4,
                }}
              >
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>
                  <Flex gap={2} justifyContent={'center'} w={'100%'}>
                    <Button
                      type={'button'}
                      onClick={() => handleRemoveExercise(index)}
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={'outline'}
                      type={'button'}
                      onClick={() => handleOpen(item)}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
