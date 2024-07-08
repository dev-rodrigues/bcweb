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
  useDisclosure,
} from '@chakra-ui/react'
import { AlertCircle } from 'lucide-react'
import { CiCircleCheck } from 'react-icons/ci'
import { RiAedLine, RiDeleteBack2Fill } from 'react-icons/ri'

import { ConfigureSetDrawer } from '@/pages/app/training/components/configure-set-drawer.tsx'
import { SelectedExercise } from '@/pages/app/training/modals/add-exercise-phasing-modal.tsx'

interface Props {
  data: SelectedExercise[]
  handleRemoveExercise: (index: number) => void
}

export function TabSelectedExerciseTable({
  data,
  handleRemoveExercise,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Table
        style={{
          overflow: 'auto',
        }}
      >
        <Thead>
          <Th>Exercise</Th>
          <Th textAlign={'center'}>Actions</Th>
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
                  {item.bag ? (
                    <Tooltip label={'Configure te execution'}>
                      <AlertCircle color={'yellow'} />
                    </Tooltip>
                  ) : (
                    <Tooltip label={'Configuretion execution completed'}>
                      <CiCircleCheck color={'green'} />
                    </Tooltip>
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
                  <Tooltip hasArrow label="Execution" bg="blue.200">
                    <Button
                      size="sm"
                      fontSize="sm"
                      type={'button'}
                      colorScheme="purple"
                      onClick={onOpen}
                    >
                      <Icon as={RiAedLine} />
                    </Button>
                  </Tooltip>
                  <Tooltip hasArrow label="Remove exercise" bg="blue.200">
                    <Button
                      size="sm"
                      fontSize="sm"
                      type={'button'}
                      colorScheme="red"
                      onClick={() => {
                        handleRemoveExercise(index)
                      }}
                    >
                      <Icon as={RiDeleteBack2Fill} />
                    </Button>
                  </Tooltip>
                  <ConfigureSetDrawer
                    onRequestClose={onClose}
                    isOpen={isOpen}
                    selected={item}
                  />
                </Container>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}
