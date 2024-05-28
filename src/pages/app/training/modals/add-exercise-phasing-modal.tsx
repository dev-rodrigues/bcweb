import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'

import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { TabSelectExerciseTable } from '@/pages/app/training/components/tab-select-exercise-table.tsx'
import { TabSelectedExerciseTable } from '@/pages/app/training/components/tab-selected-exercise-table.tsx'
import { useExercises } from '@/services/exercises-hook.ts'
import {
  ContentItemSchemaType,
  SearchExerciseForm,
  SearchExerciseFormType,
} from '@/types/common-exercise.ts'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export interface SelectedExercise {
  exercise: ContentItemSchemaType
  bag: any
}

export function AddExercisePhasingModal({ isOpen, onRequestClose }: Props) {
  const size = 4
  const [selectedExercise, setSelectedExercise] = useState<SelectedExercise[]>(
    [],
  )
  const [page, setPage] = useState(0)
  const { data, isFetching } = useExercises(page, size)

  const toast = useToast()

  const { register } = useForm<SearchExerciseFormType>({
    resolver: zodResolver(SearchExerciseForm),
  })

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
      onRequestClose={onRequestClose}
    >
      <Flex justify="flex-end">
        <Button type="button" onClick={makeModalClose}>
          <FaRegTimesCircle size={25} />
        </Button>
      </Flex>
      <Box flex="1" borderRadius={8} overflow="auto">
        <Heading size="lg" fontWeight="normal">
          Add Exercise
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <Tabs>
          <TabList>
            <Tab>Select</Tab>
            <Tab>
              <Container>{`Selected ${selectedExercise.length}`}</Container>
            </Tab>
            <Tab isDisabled>Heat Map</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing="8">
                <HStack
                  width={'100%'}
                  display={'flex'}
                  alignItems={''}
                  flexDirection={{
                    base: 'column',
                    md: 'row',
                  }}
                  gap={{
                    base: 2,
                    md: 4,
                  }}
                >
                  <div>
                    <Tooltip label={'Search by exercise name'}>
                      <Label htmlFor="type">Exercise:</Label>
                    </Tooltip>
                    <Input
                      id="type"
                      type="text"
                      style={{
                        width: '400px',
                      }}
                      {...register('name')}
                    />
                  </div>

                  <Button
                    marginTop={{
                      base: 1,
                      md: 6,
                    }}
                    leftIcon={<SearchIcon />}
                    type={'button'}
                  />
                </HStack>

                {isFetching ? (
                  <div className="mb-4 mt-4 flex justify-center">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <TabSelectExerciseTable
                    setPage={setPage}
                    data={data}
                    size={size}
                    page={page}
                    handleAddExercise={handleAddExercise}
                  />
                )}
              </VStack>
            </TabPanel>
            <TabPanel
              style={{
                overflow: 'scroll',
                maxHeight: '350px',
              }}
            >
              <>
                <TabSelectedExerciseTable
                  data={selectedExercise}
                  handleRemoveExercise={handleRemoveExercise}
                />
              </>
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
