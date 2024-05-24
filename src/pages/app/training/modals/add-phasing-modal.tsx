import { Box, Divider, Flex, Heading } from '@chakra-ui/react'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { PhasingTable } from '@/pages/app/training/components/phasing-table.tsx'
import { usePhasing } from '@/services/phasing-hook.ts'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
  studentId?: number | undefined
}

export function AddPhasingModal({ isOpen, onRequestClose, studentId }: Props) {
  const { data, isFetching } = usePhasing()

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Flex justify="flex-end">
        <button type="button" onClick={onRequestClose}>
          <FaRegTimesCircle size={25} />
        </button>
      </Flex>
      <Box flex="1" borderRadius={8}>
        <Heading size="lg" fontWeight="normal">
          Add Phrasings
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        {isFetching ? (
          <div className="mb-4 mt-4 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <Flex>
            <PhasingTable
              data={data}
              onRequestClose={onRequestClose}
              studentId={studentId}
            />
          </Flex>
        )}
      </Box>
    </Modal>
  )
}
