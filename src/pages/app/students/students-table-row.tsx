import { Search, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx'
import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { StudentDetail } from '@/pages/app/students/student-detail.tsx'
import { GetStudentTypeType } from '@/types/common-students.ts'

type StudentsTableRowProps = {
  key: number
  data: GetStudentTypeType
}

export function StudentsTableRow({ key, data }: StudentsTableRowProps) {
  return (
    <TableRow key={key}>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <StudentDetail data={data} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>
      <TableCell className="text-muted-foreground">{data.name}</TableCell>
      <TableCell>
        <Button
          // disabled={onExcluding}
          variant="outline"
          // onClick={() => onSubmit()}
        >
          <Trash2 className="mr-2 h-3 w-3" />
          Remover
        </Button>
      </TableCell>
    </TableRow>
  )
}
