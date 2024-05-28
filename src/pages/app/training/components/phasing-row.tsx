import { Button, Icon, Td, Tr } from '@chakra-ui/react'
import { Edit2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { AddExercisePhasingModal } from '@/pages/app/training/modals/add-exercise-phasing-modal.tsx'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

interface PhasingRowProps {
  data: GetCustomerPhasingType
  key: number
}

export function PhasingRow({ data, key }: PhasingRowProps) {
  const [openAddExercise, setOpenAddExercise] = useState(false)

  const handleModalAddExercise = () => {
    setOpenAddExercise(!openAddExercise)
  }

  useEffect(() => {
    if (openAddExercise) {
      document.body.style.overflow = 'hidden'
    }
  }, [openAddExercise])

  return (
    <Tr
      key={key}
      _hover={{
        transform: 'scale(1.02)',
        transition: 'transform 0.3s',
      }}
    >
      <Td width={'100%'}>{data.name}</Td>
      <Td>
        <Button
          onClick={handleModalAddExercise}
          backgroundColor="pink.300"
          rightIcon={<Icon as={Edit2Icon} />}
        ></Button>
      </Td>
      <AddExercisePhasingModal
        isOpen={openAddExercise}
        onRequestClose={handleModalAddExercise}
      />
    </Tr>
  )
}
