import { Td, Tr } from '@chakra-ui/react'

import { Checkbox } from '@/components/ui/checkbox.tsx'
import { GetExerciseMuscleGroupType } from '@/types/common-exercise-muscle-group-type.ts'

type ExerciseCreateMuscleGroupRowProps = {
  data: GetExerciseMuscleGroupType
  handleAddGroup: (id: number) => void
  handleRemoveGroup: (id: number) => void
}
export function ExerciseCreateMuscleGroupRow({
  data,
  handleAddGroup,
  handleRemoveGroup,
}: ExerciseCreateMuscleGroupRowProps) {
  return (
    <Tr height={10}>
      <Td textAlign={'center'}>
        <Checkbox
          onCheckedChange={(checked: boolean) => {
            return checked
              ? handleAddGroup(data.id)
              : handleRemoveGroup(data.id)
          }}
        />
      </Td>
      <Td>{data.name}</Td>
    </Tr>
  )
}
