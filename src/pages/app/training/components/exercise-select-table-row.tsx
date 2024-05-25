import { Button, HStack } from '@chakra-ui/react'
import { PlusIcon } from 'lucide-react'

import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { ContentItemSchemaType } from '@/types/common-exercise.ts'

type Props = {
  key: number
  data: ContentItemSchemaType
  handleAddExercise: (exercise: ContentItemSchemaType) => void
}

export function ExerciseSelectTableRow({
  key,
  data,
  handleAddExercise,
}: Props) {
  return (
    <TableRow key={key}>
      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>
      <TableCell className="text-muted-foreground">{data.name}</TableCell>
      <TableCell className="">
        <HStack>
          <Button onClick={() => handleAddExercise(data)}>
            <PlusIcon />
          </Button>
        </HStack>
      </TableCell>
    </TableRow>
  )
}
