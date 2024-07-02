import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination.tsx'
import { TeamTableFilter } from '@/pages/app/teams/team-table-filter.tsx'
import { useTeamPaged } from '@/services/team-hook.ts'
import { Table, TableContainer, Tbody, Th, Tr } from '@chakra-ui/react'
import { TeamTableRow } from './team-table-row'

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
            <TableContainer>
              <Table>
                <Tr>
                  <Th></Th>
                  <Th>Identificador</Th>
                  <Th>Realizado há</Th>
                  <Th>Status</Th>
                  <Th>Time</Th>
                </Tr>
                <Tbody>
                  {data?.content.map((it, i) => {
                    return <TeamTableRow key={i} data={it} />
                  })}
                </Tbody>
              </Table>
            </TableContainer>
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
