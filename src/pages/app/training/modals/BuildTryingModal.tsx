import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'

import { TabSelectedExerciseTable } from '@/pages/app/training/components/tab-selected-exercise-table.tsx'
import {
  BuildTryingSearchExercises,
  SearchExerciseResponse,
} from '@/pages/app/training/wip/BuildTryingSearchExercises.tsx'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export function BuildTryingModal({ isOpen, onRequestClose }: Props) {
  const [selected, setSelected] = useState<SearchExerciseResponse[]>([])

  const handleSelectExercise = (exercise: SearchExerciseResponse) => {
    setSelected([...selected, exercise])
  }

  const handleRemoveExercise = (index: number) => {
    const newSelected = selected.filter((_, i) => i !== index)
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
          Build Trying for you student
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
            <TabPanel>
              <BuildTryingSearchExercises
                handleSelectExercise={handleSelectExercise}
              />
            </TabPanel>
            <TabPanel>
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
    </Modal>
  )
}
