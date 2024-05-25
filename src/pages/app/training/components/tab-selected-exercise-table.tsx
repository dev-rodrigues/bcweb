import {
  Button,
  Container,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react'
import { AlertCircle } from 'lucide-react'
import { CiCircleCheck } from 'react-icons/ci'
import { RiAedLine, RiDeleteBack2Fill } from 'react-icons/ri'

import { SelectedExercise } from '@/pages/app/training/modals/add-exercise-phasing-modal.tsx'

interface Props {
  data: SelectedExercise[]
  handleRemoveExercise: (index: number) => void
}

export function TabSelectedExerciseTable({
  data,
  handleRemoveExercise,
}: Props) {
  return (
    <>
      <Table
        colorScheme="whiteAlpha"
        maxH={'300px'}
        style={{
          overflow: 'auto',
        }}
      >
        <Thead>
          <Th>
            <div>Exercise</div>
          </Th>
          <Th>
            <div></div>
          </Th>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr
              key={index}
              _hover={{
                transform: 'scale(1.02)',
                transition: 'transform 0.3s',
              }}
            >
              <Td w={'100%'}>
                <Container display={'flex'} gap={2} alignItems={'center'}>
                  {!item.bag ? (
                    <AlertCircle color={'yellow'} />
                  ) : (
                    <CiCircleCheck color={'green'} />
                  )}
                  {item.exercise.name}
                </Container>
              </Td>
              <Td>
                <Container
                  gap={1}
                  display={'flex'}
                  flexDirection={{
                    base: 'column',
                    md: 'row',
                  }}
                >
                  <Tooltip hasArrow label="Remove exercise" bg="blue.200">
                    <Button
                      size="sm"
                      fontSize="sm"
                      type={'button'}
                      colorScheme="purple"
                      onClick={() => {
                        handleRemoveExercise(index)
                      }}
                    >
                      <Icon as={RiDeleteBack2Fill} />
                    </Button>
                  </Tooltip>
                  <Tooltip hasArrow label="Make" bg="blue.200">
                    <Button
                      size="sm"
                      fontSize="sm"
                      type={'button'}
                      colorScheme="purple"
                      onClick={() => {
                        handleRemoveExercise(index)
                      }}
                    >
                      <Icon as={RiAedLine} />
                    </Button>
                  </Tooltip>
                </Container>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}
