import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx'
import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { TeamDetails } from '@/pages/app/teams/team-details.tsx'

type TeamTableRowProps = {
  key: number
}

export function TeamTableRow({ key }: TeamTableRowProps) {
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
          <TeamDetails />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">1</TableCell>

      <TableCell className="text-muted-foreground">Há 15 minutos</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>

      <TableCell className="font-medium">Team Braga</TableCell>

      <TableCell>
        <Button variant="outline">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
