import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table.tsx'
import { ContentItemSchemaType } from '@/types/common-exercise.ts'

type Props = {
  data: ContentItemSchemaType
}

export function ExerciseDetails({ data }: Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{`ID: ${data.id}`}</DialogTitle>
        <DialogDescription>Detalhes do exercicío</DialogDescription>
      </DialogHeader>
      <div className="space-x-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Nome</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className={'font-medium text-muted-foreground'}>
                    {data.name}
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Time</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className={'font-medium text-muted-foreground'}>
                    {data.name}
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Tipo de exercicío
              </TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className={'font-medium text-muted-foreground'}>
                    {data.typeId} - {data.typeName}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
