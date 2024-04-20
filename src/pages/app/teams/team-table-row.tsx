import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'

import { updateStatus } from '@/api/sign-up.ts'
import { queryClient } from '@/app.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx'
import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { TeamDetails } from '@/pages/app/teams/team-details.tsx'
import { calculateTimeDifference } from '@/types/common-date.ts'
import { ContentItemSchemaType } from '@/types/common-team.ts'

type TeamTableRowProps = {
  key: number
  data: ContentItemSchemaType
}

type UpdateTeamType = {
  status: string
}

export function TeamTableRow({ key, data }: TeamTableRowProps) {
  const mutation = useMutation({
    mutationFn: ({
      id,
      variables,
    }: {
      id: number
      variables: UpdateTeamType
    }) => updateStatus(id, variables.status),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['team-paged'],
        })
        .then(() => {
          console.log('Invalidate query')
        })
    },
  })

  const onStatusChange = (id: number, status: string) => {
    mutation.mutate({ id, variables: { status } })
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
          <TeamDetails data={data} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>

      <TableCell className="text-muted-foreground">
        {calculateTimeDifference(data.createdAt)}
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">
            {data.status}
          </span>
        </div>
      </TableCell>

      <TableCell className="font-medium">{data.name}</TableCell>

      <TableCell>
        <Button
          variant="outline"
          onClick={() => onStatusChange(data.id, 'ACTIVE')}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          onClick={() => onStatusChange(data.id, 'BLOCKED')}
        >
          <X className="mr-2 h-3 w-3" />
          Bloquear
        </Button>
      </TableCell>
    </TableRow>
  )
}
