import { Button, Icon } from '@chakra-ui/react'
import { Edit2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { AddExercisePhasingModal } from '@/pages/app/training/modals/add-exercise-phasing-modal.tsx'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

interface PhasingRowProps {
  data: GetCustomerPhasingType
}

export function PhasingRow({ data }: PhasingRowProps) {
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
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>
      <TableCell className="w-full font-mono text-xs font-medium">
        {data.name}
      </TableCell>
      <TableCell className="w-full font-mono text-xs font-medium">
        <Button
          onClick={handleModalAddExercise}
          backgroundColor="pink.300"
          rightIcon={<Icon as={Edit2Icon} />}
        ></Button>
      </TableCell>
      <AddExercisePhasingModal
        isOpen={openAddExercise}
        onRequestClose={handleModalAddExercise}
      />
    </TableRow>
  )
}
