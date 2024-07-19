import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

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
      isOpen={isOpen}
      onClose={onRequestClose}
      blockScrollOnMount={true}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
      size={'xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" alignItems="center">
          Select training series
          {isFetching && <LoadingSpinner className="ml-2" />}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PhasingTable
            data={data}
            onRequestClose={onRequestClose}
            studentId={studentId}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
