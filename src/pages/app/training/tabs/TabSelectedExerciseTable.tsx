import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Settings, Trash } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button.tsx'
import {
  ConfigureTraining,
  ConfigureTrainingForm,
} from '@/pages/app/training/components/configure-training.tsx'
import { SearchExerciseResponse } from '@/pages/app/training/tabs/TabBuildTryingSearchExercises.tsx'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

interface Props {
  selected: SearchExerciseResponse[]
  handleRemoveExercise: (index: number) => void
  phasing: GetCustomerPhasingType
  handleUpdateBag: (key: string, config: ConfigureTrainingForm) => void
}

export function TabSelectedExerciseTable({
  selected,
  handleRemoveExercise,
  handleUpdateBag,
}: Props) {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

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
        handleUpdateBag={handleUpdateBag}
      />
      <TableContainer
        borderColor={'rgba(0, 0, 0, 0.4)'}
        overflowX={'hidden'}
        borderWidth={0.1}
        borderRadius={'5px'}
        px={10}
      >
        <Table>
          <Thead>
            <Tr>
              {!isDrawerSidebar && (
                <Th borderColor={'rgba(0, 0, 0, 0.4)'}>Id</Th>
              )}
              <Th borderColor={'rgba(0, 0, 0, 0.4)'} maxW={'450px'}>
                Exercise
              </Th>
              <Th borderColor={'rgba(0, 0, 0, 0.4)'} textAlign={'center'}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {selected.map((item, index) => (
              <Tr key={index}>
                {!isDrawerSidebar && <Td>{item.id}</Td>}
                <Td>{item.name}</Td>
                <Td>
                  <Flex
                    gap={1}
                    justifyContent={'center'}
                    direction={{
                      base: 'column',
                      lg: 'row',
                    }}
                  >
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
