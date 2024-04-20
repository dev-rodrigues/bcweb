import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination.tsx'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { TeamTableFilter } from '@/pages/app/teams/team-table-filter.tsx'
import { TeamTableRow } from '@/pages/app/teams/team-table-row.tsx'
import { useTeamPaged } from '@/services/team-hook.ts'

export function Teams() {
  const [page] = useState(0)
  const size = 10

  const { data } = useTeamPaged(page, size)

  return (
    <>
      <Helmet title="Teams" />
      <div className="flex flex-col gap-4">
        <h1 className={'text-3xl font-bold tracking-tight'}>Teams</h1>
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
                {data?.content.map((it, i) => {
                  return <TeamTableRow key={i} data={it} />
                })}
              </TableBody>
            </Table>
          </div>

          <Pagination
            pageIndex={page}
            totalCount={data?.total ? data.total : 0}
            perPage={10}
          />
        </div>
      </div>
    </>
  )
}
