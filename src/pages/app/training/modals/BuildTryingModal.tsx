import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { api } from '@/lib/axios.ts'
import { ConfigureTrainingForm } from '@/pages/app/training/components/configure-training.tsx'
import { TabSelectedExerciseTable } from '@/pages/app/training/tabs/tab-selected-exercise-table.tsx'
import {
  SearchExerciseResponse,
  TabBuildTryingSearchExercises,
} from '@/pages/app/training/tabs/TabBuildTryingSearchExercises.tsx'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
  phasing: GetCustomerPhasingType
}

interface CustomerPhasingExerciseDTO {
  customerPhasing: number
  exerciseId: number
}

interface CustomerPhasingExerciseResponseDTO {
  id: number
  customerPhasing: number
  exerciseId: number
}

export function BuildTryingModal({ phasing, isOpen, onRequestClose }: Props) {
  const [selected, setSelected] = useState<SearchExerciseResponse[]>([])
  const [loading, setLoading] = useState(false)

  const handleSelectExercise = (exercise: SearchExerciseResponse) => {
    setSelected((prevSelected) => [
      ...prevSelected,
      { ...exercise, key: uuidv4() },
    ])
    toast.success(`Exercise ${exercise.name} added to the list`)
  }

  const handleRemoveExercise = (index: number) => {
    const newSelected = selected.filter((_, i) => i !== index)
    setSelected(newSelected)
    toast.success('Exercise removed from the list')
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const payload: CustomerPhasingExerciseDTO[] = selected.map(
        (exercise) => ({
          customerPhasing: phasing.id,
          exerciseId: exercise.id,
        }),
      )

      await api.post<CustomerPhasingExerciseResponseDTO[]>(
        '/customer-phasing-exercise',
        payload,
      )

      toast.success(`Training successfully added to ${phasing.name}`)
      setSelected([])
      onRequestClose()
    } catch (error) {
      toast.error('Error to add training')
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

  return (
    <Modal
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      shouldCloseOnEsc={false}
      onRequestClose={onRequestClose}
    >
      <Flex justifyContent={'space-between'}>
        <Heading size="md" fontWeight="normal">
          {`Build Trying for you student: ${phasing.name.toUpperCase()}`}
        </Heading>

        <Flex>
          <Button
            isLoading={loading}
            type="button"
            onClick={() => {
              setSelected([])
              onRequestClose()
            }}
          >
            <FaRegTimesCircle size={25} />
          </Button>
        </Flex>
      </Flex>

      <Box flex="1" borderRadius={8} overflow={loading ? 'hidden' : 'auto'}>
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
                  data={selected}
                  handleRemoveExercise={handleRemoveExercise}
                  phasing={phasing}
                />
              </TabPanel>
              <TabPanel>
                <p>WIP!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Box>

      <Divider my="6" borderColor="gray.700" />

      <Button
        isLoading={loading}
        type={'button'}
        bg={'green.500'}
        rightIcon={<SaveIcon />}
        onClick={handleSave}
      >
        Save
      </Button>
    </Modal>
  )
}
