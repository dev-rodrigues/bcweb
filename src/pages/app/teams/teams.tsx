import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination.tsx'
import { TeamTableFilter } from '@/pages/app/teams/team-table-filter.tsx'
import { useTeamPaged } from '@/services/team-hook.ts'

import { TeamTableRow } from './team-table-row'

export function Teams() {
  const [page] = useState(0)
  const size = 10

  const { data } = useTeamPaged(page, size)

  return (
    <>
      <Helmet title="Teams" />
      <Heading>Teams</Heading>
      <TeamTableFilter />

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Detail</Th>
              <Th>Id</Th>
              <Th>Created at</Th>
              <Th>Status</Th>
              <Th>Time</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.content.map((it, i) => {
              return <TeamTableRow key={i} data={it} />
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td colSpan={6}>
                <Pagination
                  pageIndex={page}
                  totalCount={data?.total ? data.total : 0}
                  perPage={10}
                />
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  )
}
