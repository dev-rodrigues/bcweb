import { HStack, Td, Tr, useBreakpointValue } from '@chakra-ui/react'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { SearchExerciseResponse } from '@/pages/app/training/tabs/TabBuildTryingSearchExercises.tsx'

type Props = {
  id: number
  data: SearchExerciseResponse
  handleAddExercise: (exercise: SearchExerciseResponse) => void
}

export function ExerciseSelectTableRow({ id, data, handleAddExercise }: Props) {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })
  return (
    <Tr key={id}>
      {!isDrawerSidebar && <Td>{data.id}</Td>}
      <Td>{data.name}</Td>
      <Td>
        <HStack>
          <Button type={'button'} onClick={() => handleAddExercise(data)}>
            <PlusIcon className="h-2 w-2" />
          </Button>
        </HStack>
      </Td>
    </Tr>
  )
}
