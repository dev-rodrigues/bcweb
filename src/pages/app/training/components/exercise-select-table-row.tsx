import { Checkbox } from '@chakra-ui/react'

import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { ContentItemSchemaType } from '@/types/common-exercise.ts'

type Props = {
  key: number
  data: ContentItemSchemaType
}

export function ExerciseSelectTableRow({ key, data }: Props) {
  return (
    <TableRow key={key}>
      <TableCell>
        <Checkbox borderColor={'white'} />
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>

      <TableCell className="text-muted-foreground">{data.name}</TableCell>
    </TableRow>
  )
}
