import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react'
import { Save, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'

import { InputForm } from '@/components/ui/form/Input.tsx'
import { TabSelectExerciseTable } from '@/pages/app/training/components/tab-select-exercise-table.tsx'
import { TabSelectedExerciseTable } from '@/pages/app/training/components/tab-selected-exercise-table.tsx'
import { useExercises } from '@/services/exercises-hook.ts'
import { ContentItemSchemaType } from '@/types/common-exercise.ts'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export interface SelectedExercise {
  exercise: ContentItemSchemaType
  bag: any
}

export function AddExercisePhasingModal({ isOpen, onRequestClose }: Props) {
  const size = 5
  const [selectedExercise, setSelectedExercise] = useState<SelectedExercise[]>(
    [],
  )
  const [inputSearch, setInputSearch] = useState('')

  const [page, setPage] = useState(0)
  const { data } = useExercises(page, size)

  const toast = useToast()

  function handleAddExercise(exercise: ContentItemSchemaType) {
    toast({
      title: 'Exercise added',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    setSelectedExercise([
      ...selectedExercise,
      {
        exercise,
        bag: { sets: 0, reps: 0, rest: 0 },
      },
    ])
  }

  function handleRemoveExercise(index: number) {
    toast({
      title: 'Exercise removed',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
    setSelectedExercise([
      ...selectedExercise.slice(0, index),
      ...selectedExercise.slice(index + 1),
    ])
  }

  function clearSelected() {
    setSelectedExercise([])
  }

  function makeModalClose() {
    clearSelected()
    onRequestClose()
  }

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      shouldCloseOnEsc={false}
      onRequestClose={onRequestClose}
    >
      <Flex justifyContent={'space-between'}>
        <Heading size="md" fontWeight="normal">
          Add Exercise
        </Heading>
        <Flex>
          <Button type="button" onClick={makeModalClose}>
            <FaRegTimesCircle size={25} />
          </Button>
        </Flex>
      </Flex>

      <Box flex="1" borderRadius={8} overflow="auto">
        <Tabs size={'sm'} colorScheme={'red'}>
          <TabList>
            <Tab>Select</Tab>
            <Tab>
              <Container>{`Selected ${selectedExercise.length}`}</Container>
            </Tab>
            <Tab isDisabled>Heat Map</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex direction={'row'}>
                <Flex w={'50%'} flex={1} mr={10} as="form" flexDirection="row">
                  <InputForm
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    label={'Exercise'}
                    pk={'type'}
                    id="type"
                    type="text"
                    mr={2}
                    style={{
                      width: '400px',
                    }}
                  />

                  <Button mt={9} type={'button'}>
                    <Icon as={SearchIcon} />
                  </Button>
                </Flex>
                <Flex direction={'column'} w={'50%'} h={80}>
                  <TabSelectExerciseTable
                    setPage={setPage}
                    data={data}
                    size={size}
                    page={page}
                    handleAddExercise={handleAddExercise}
                  />
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel
              minH={'352px'}
              style={{
                overflow: 'scroll',
                maxHeight: '350px',
              }}
            >
              <TabSelectedExerciseTable
                data={selectedExercise}
                handleRemoveExercise={handleRemoveExercise}
              />
            </TabPanel>
            <TabPanel>
              <p>WIP!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <HStack w={'100%'}>
          <Button colorScheme={'green'} leftIcon={<Save />}>
            Save
          </Button>
        </HStack>
      </Box>
    </Modal>
  )
}
