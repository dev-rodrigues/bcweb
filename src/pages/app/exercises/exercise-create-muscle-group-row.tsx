import { Checkbox } from '@/components/ui/checkbox.tsx'
import { TableCell, TableRow } from '@/components/ui/table.tsx'
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
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">
        <Checkbox
          onCheckedChange={(checked: boolean) => {
            return checked
              ? handleAddGroup(data.id)
              : handleRemoveGroup(data.id)
          }}
        />
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>
      <TableCell className="text-muted-foreground">{data.name}</TableCell>
    </TableRow>
  )
}
