import { Helmet } from 'react-helmet-async'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { TeamTableFilter } from '@/pages/app/teams/team-table-filter.tsx'
import { TeamTableRow } from '@/pages/app/teams/team-table-row.tsx'

export function Teams() {
  return (
    <>
      <Helmet title="Teams" />
      <div className="flex flex-col gap-4">
        <h1 className={'text-3xl font-bold tracking-tight'}>Times</h1>
      </div>
      <div className="space-y-2.5">
        <TeamTableFilter />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => {
                return <TeamTableRow key={i} />
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
