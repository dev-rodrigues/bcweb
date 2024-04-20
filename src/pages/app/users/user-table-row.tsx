import { Search, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx'
import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { ContentItemSchemaType } from '@/types/common-users.ts'

type UserTableRowProps = {
  key: number
  data: ContentItemSchemaType
  // currentPage: number
}

export function UserTableRow({ key, data }: UserTableRowProps) {
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
          {/* <ExerciseDetails data={data} /> */}
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>
      <TableCell className="text-muted-foreground">{data.name}</TableCell>
      <TableCell>
        <Button
          variant="outline"
          onClick={() => {
            console.log('delete user')
          }}
        >
          <Trash2 className="mr-2 h-3 w-3" />
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  )
}
