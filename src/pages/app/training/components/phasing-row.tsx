import { Icon, Td, Tr, useDisclosure } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Edit2Icon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { deletePhasingByCustomer } from '@/api/phasing.ts'
import { queryClient } from '@/app.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BuildTryingModal } from '@/pages/app/training/modals/BuildTryingModal.tsx'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

interface PhasingRowProps {
  data: GetCustomerPhasingType
  key: number
}

export function PhasingRow({ data }: PhasingRowProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [handleDelete, setHandleDelete] = useState(false)

  const mutation = useMutation({
    mutationFn: deletePhasingByCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries().finally(() => {
        setHandleDelete(false)
        toast.success('Phasing successfully deleted')
      })
    },
  })

  const handleDeletePhasing = (id: number) => {
    setHandleDelete(true)
    mutation.mutate(id)
  }

  // useEffect(() => {
  //   if (openAddExercise) {
  //     document.body.style.overflow = 'hidden'
  //   }
  // }, [openAddExercise])

  return (
    <>
      <BuildTryingModal
        phasing={data}
        isOpen={isOpen}
        onRequestClose={onClose}
      />

      <Tr
        borderBottom={'solid'}
        borderColor={'rgba(0, 0, 0, 0.2)'}
        _hover={{
          transform: 'scale(1.01)',
          transition: 'transform 0.3s',
          opacity: 0.4,
        }}
      >
        <Td>{data.id}</Td>
        <Td>{data.name}</Td>
        <Td textAlign={'center'}>
          <Button variant="outline" onClick={onOpen}>
            <Icon as={Edit2Icon} />
          </Button>
          <Button
            onClick={() => handleDeletePhasing(data.id)}
            disabled={handleDelete}
          >
            <Icon as={TrashIcon} />
          </Button>
        </Td>
      </Tr>
    </>
  )
}
