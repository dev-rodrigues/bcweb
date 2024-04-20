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
import { mapService } from '@/pages/app/common/serviceMap.ts'
import { ContentItemSchemaType } from '@/types/common-team.ts'

type Props = {
  data: ContentItemSchemaType
}

export function TeamDetails({ data }: Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {`Requisição de acesso a plataforma: ${data.id}`}
        </DialogTitle>
        <DialogDescription>Detalhes do time</DialogDescription>
      </DialogHeader>
      <div className="space-x-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className={'font-medium text-muted-foreground'}>
                    {data.status}
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
                Responsável
              </TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className={'font-medium text-muted-foreground'}>
                    {data.owner.name}
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className={'font-medium text-muted-foreground'}>
                    {data.owner.customerPhone}
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className={'font-medium text-muted-foreground'}>
                    {data.owner.customerEmail}
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Área</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className={'font-medium text-muted-foreground'}>
                    {/* {data ? mapService(data.service) : '---'} */}
                    {mapService(data.service.toString())}
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
