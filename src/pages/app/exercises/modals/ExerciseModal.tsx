import { Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from '@chakra-ui/react'
  
  interface Props {
    isOpen: boolean
    onRequestClose: () => void
  }
  
  export function ExerciseModal({ isOpen, onRequestClose }: Props) {
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
            Exercise Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  