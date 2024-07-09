import { Icon, Td, Tr } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Edit2Icon, TrashIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
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
  const [openAddExercise, setOpenAddExercise] = useState(false)
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

  const handleModalAddExercise = () => {
    setOpenAddExercise(!openAddExercise)
  }

  const handleDeletePhasing = (id: number) => {
    setHandleDelete(true)
    mutation.mutate(id)
  }

  useEffect(() => {
    if (openAddExercise) {
      document.body.style.overflow = 'hidden'
    }
  }, [openAddExercise])

  return (
    <>
      <BuildTryingModal
        isOpen={openAddExercise}
        onRequestClose={handleModalAddExercise}
      />

      <Tr
        _hover={{
          transform: 'scale(1.02)',
          transition: 'transform 0.3s',
          backgroundColor: 'rgba(0, 0, 0, 1)',
        }}
      >
        <Td>{data.id}</Td>
        <Td textAlign={'center'}>{data.name}</Td>
        <Td textAlign={'center'}>
          <Button variant="outline" onClick={handleModalAddExercise}>
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
