import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { getExerciseSelectedByCustomerPhasingId } from '@/api/exercise-media.ts'
import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { api } from '@/lib/axios.ts'
import { ConfigureTrainingForm } from '@/pages/app/training/components/configure-training.tsx'
import {
  SearchExerciseResponse,
  TabBuildTryingSearchExercises,
} from '@/pages/app/training/tabs/TabBuildTryingSearchExercises.tsx'
import { TabSelectedExerciseTable } from '@/pages/app/training/tabs/TabSelectedExerciseTable.tsx'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
  phasing: GetCustomerPhasingType | undefined
}

interface CustomerPhasingExerciseDTO {
  customerPhasing: number
  selected: number
  exerciseId: number
  bag: ConfigureTrainingForm
}

interface CustomerPhasingExerciseResponseDTO {
  id: number
  customerPhasing: number
  exerciseId: number
}

export function BuildTryingModal({ phasing, isOpen, onRequestClose }: Props) {
  const [selected, setSelected] = useState<SearchExerciseResponse[]>([])
  const [selectedRemoved, setSelectedRemoved] = useState<
    SearchExerciseResponse[]
  >([])
  const [loading, setLoading] = useState(false)

  const handleSelectExercise = (exercise: SearchExerciseResponse) => {
    setSelected((prevSelected) => [
      ...prevSelected,
      { ...exercise, key: uuidv4() },
    ])
    toast.success(`Exercise ${exercise.name} added to the list`)
  }

  const handleRemoveExercise = (index: number) => {
    const exercise = selected[index]
    if (exercise.selected != null || exercise.selected !== undefined) {
      console.log(`Exercise ${exercise.id} putted in removed list`)
      setSelectedRemoved((prevSelected) => [...prevSelected, exercise])
    }

    const newSelected = selected.filter((_, i) => i !== index)
    setSelected(newSelected)
    toast.success('Exercise removed from the list')
  }

  const handleSave = async () => {
    if (!phasing) {
      toast.error('Phasing data is missing')
      return
    }

    if (selected.length === 0) {
      toast.error('No exercise selected')
      return
    }

    try {
      setLoading(true)

      const payload: CustomerPhasingExerciseDTO[] = selected.map(
        (exercise) => ({
          customerPhasing: phasing.id,
          selected: exercise.selected,
          exerciseId: exercise.id,
          bag: exercise.bag,
        }),
      )

      const newData = payload.filter(
        (it) => it.selected === null || it.selected === undefined,
      )
      const updatedData = payload.filter(
        (it) => it.selected !== null && it.selected !== undefined,
      )

      const requests: Promise<any>[] = []

      if (newData.length > 0) {
        requests.push(
          api.post<CustomerPhasingExerciseResponseDTO[]>(
            '/customer-phasing-exercise',
            newData,
          ),
        )
      }

      if (selectedRemoved.length > 0) {
        requests.push(
          api.delete('/customer-phasing-exercise', {
            data: selectedRemoved.map((it) => it.selected),
          }),
        )
      }

      if (updatedData.length > 0) {
        requests.push(
          api.put<CustomerPhasingExerciseResponseDTO[]>(
            '/customer-phasing-exercise',
            updatedData,
          ),
        )
      }

      await Promise.all(requests)

      toast.success(`Training successfully added to ${phasing.name}`)
      setSelected([])
      onRequestClose()
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(
          `Error to add training: ${error.response.data.message || 'Unknown error'}`,
        )
      } else {
        toast.error('Error to add training')
      }
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBag = (key: string, bag: ConfigureTrainingForm) => {
    const newSelected = selected.map((item) => {
      if (item.key === key) {
        return { ...item, bag }
      }
      return item
    })

    setSelected(newSelected)
  }

  useEffect(() => {
    if (!phasing || !isOpen) {
      return
    }

    const isMounted = true

    const fetchData = async () => {
      try {
        const selectedData = await getExerciseSelectedByCustomerPhasingId(
          phasing.id,
        )

        if (selectedData && isMounted) {
          const newSelected = selectedData.map((item) => ({
            id: item.id,
            name: item.name,
            key: uuidv4(),
            selected: item.selected,
            bag: {
              totalSeries: item.series,
              totalRepetitions: item.repetitions,
              rest: item.rest,
              weight: item.weight,
              method: item.exerciseMethodId.toString(),
            },
          }))

          setSelected(newSelected)
        }
      } catch (error) {
        console.error('Failed to fetch selected data', error)
      }
    }

    fetchData()
  }, [phasing, isOpen])

  if (!phasing) {
    return null
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onRequestClose}
      blockScrollOnMount={true}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
      size={'5xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Build Trying for your student: ${phasing.name.toUpperCase()}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading && (
            <VStack alignItems={'center'} alignContent={'center'}>
              <LoadingSpinner />
            </VStack>
          )}
          {!loading && (
            <Tabs size={'sm'} colorScheme={'red'}>
              <TabList>
                <Tab>Select</Tab>
                <Tab>
                  <Container>{`Selected ${selected.length}`}</Container>
                </Tab>
                <Tab isDisabled>Heat Map</Tab>
              </TabList>

              <TabPanels>
                <TabPanel maxH={390} minH={390}>
                  <TabBuildTryingSearchExercises
                    handleSelectExercise={handleSelectExercise}
                  />
                </TabPanel>
                <TabPanel maxH={390} minH={390}>
                  <TabSelectedExerciseTable
                    handleUpdateBag={handleUpdateBag}
                    selected={selected}
                    handleRemoveExercise={handleRemoveExercise}
                    phasing={phasing}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </ModalBody>
        <ModalFooter mt={20}>
          <Button colorScheme="red" mr={3} onClick={onRequestClose}>
            Close
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
