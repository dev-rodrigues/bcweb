import React from 'react'

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
                  <span className={'font-medium text-muted-foreground'}>
                    {data.name}
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Exercício</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className={'font-medium text-muted-foreground'}>
                    {data.typeName}
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <span className="h-2 w-2 rounded-full bg-slate-400" />

            <TableRow>
              <TableCell className="text-muted-foreground">Grupos</TableCell>
              <TableCell className="flex justify-end">
                <div
                  className="flex flex-wrap items-center gap-2"
                  style={{ maxWidth: '300px' }}
                >
                  {data.muscleGroups.map((it, i) => {
                    return (
                      <React.Fragment key={i}>
                        <div style={{ marginBottom: '5px' }}>
                          <span className="h-2 w-2 rounded-full bg-slate-400" />
                          <span className={'font-medium text-muted-foreground'}>
                            {it}
                          </span>
                        </div>
                        {(i + 1) % 3 === 0 && <br />}{' '}
                      </React.Fragment>
                    )
                  })}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
