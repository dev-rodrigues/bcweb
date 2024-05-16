import { Edit, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate(`/training/${data.id}`)
  }

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

      <TableCell className="font-mono text-xs font-medium md:text-sm">
        {data.id}
      </TableCell>
      <TableCell className="text-muted-foreground">{data.name}</TableCell>
      <TableCell className="w-[132px] md:table-cell">
        <Button
          // disabled={onExcluding}
          variant="outline"
          onClick={handleEditClick}
        >
          <Edit className="mr-2 h-3 w-3" />
          Edit
        </Button>
      </TableCell>
    </TableRow>
  )
}
