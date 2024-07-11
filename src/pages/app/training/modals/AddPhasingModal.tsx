import { Box, Button, Flex } from '@chakra-ui/react'
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
      <Flex justify="flex-end" mb={10}>
        <Button type="button" onClick={onRequestClose}>
          <FaRegTimesCircle size={25} />
        </Button>
      </Flex>

      <Box flex="1" borderRadius={8}>
        {isFetching ? (
          <div className="mb-4 mt-4 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <PhasingTable
            data={data}
            onRequestClose={onRequestClose}
            studentId={studentId}
          />
        )}
      </Box>
    </Modal>
  )
}
