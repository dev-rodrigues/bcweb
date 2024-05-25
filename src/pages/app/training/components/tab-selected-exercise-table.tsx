import { Button } from '@chakra-ui/react'
import { DeleteIcon } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { ContentItemSchemaType } from '@/types/common-exercise.ts'

interface Props {
  data: ContentItemSchemaType[]
  handleRemoveExercise: (index: number) => void
}

export function TabSelectedExerciseTable({
  data,
  handleRemoveExercise,
}: Props) {
  return (
    <>
      <Table className="mx-auto w-full md:max-w-[950px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto">Nome</TableHead>
            <TableHead className="w-auto">#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={'overflow-auto!'}>
          {data.map((it, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="text-muted-foreground">
                  {it.name}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleRemoveExercise(i)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
