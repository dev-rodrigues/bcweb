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
} from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'
import { toast } from 'sonner'

import { TabSelectedExerciseTable } from '@/pages/app/training/components/tab-selected-exercise-table.tsx'
import {
  BuildTryingSearchExercises,
  SearchExerciseResponse,
} from '@/pages/app/training/wip/BuildTryingSearchExercises.tsx'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
  phasing: GetCustomerPhasingType
}

export function BuildTryingModal({ phasing, isOpen, onRequestClose }: Props) {
  const [selected, setSelected] = useState<SearchExerciseResponse[]>([])

  const handleSelectExercise = (exercise: SearchExerciseResponse) => {
    setSelected([...selected, exercise])
    toast.success(`Exercise ${exercise.name} added to the list`)
  }

  const handleRemoveExercise = (index: number) => {
    const newSelected = selected.filter((_, i) => i !== index)
    setSelected(newSelected)
    toast.success('Exercise removed from the list')
  }

  const handleSave = () => {
    console.log(
      'Selected exercises: ',
      selected,
      'Phasing: ',
      phasing,
      'UserPhasing',
      phasing.id,
    )
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

      <Box flex="1" borderRadius={8} overflow="auto">
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
              <BuildTryingSearchExercises
                handleSelectExercise={handleSelectExercise}
              />
            </TabPanel>
            <TabPanel maxH={390} minH={390}>
              <TabSelectedExerciseTable
                data={selected}
                handleRemoveExercise={handleRemoveExercise}
              />
            </TabPanel>
            <TabPanel>
              <p>WIP!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Divider my="6" borderColor="gray.700" />

      <Button
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
