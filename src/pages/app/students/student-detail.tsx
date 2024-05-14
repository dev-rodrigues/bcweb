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
import { GetStudentTypeType } from '@/types/common-students.ts'

type Props = {
  data: GetStudentTypeType
}

export function StudentDetail({ data }: Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{`Matricula: ${data.registration}`}</DialogTitle>
        <DialogDescription>Detalhes da matricula</DialogDescription>
      </DialogHeader>
      <div className="space-x-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Nome</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className={'font-medium text-muted-foreground'}>
                    {data.name}
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className={'font-medium text-muted-foreground'}>
                    {data.email}
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
