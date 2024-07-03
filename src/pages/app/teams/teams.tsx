import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination.tsx'
import { TableHeader } from '@/components/ui/table.tsx'
import { useTeamPaged } from '@/services/team-hook.ts'

import { TeamTableRow } from './team-table-row'

export function Teams() {
  const [page] = useState(0)
  const size = 10

  const { data } = useTeamPaged(page, size)

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <>
      <Helmet title="Teams" />

      <TableContainer
        border={'inset'}
        borderColor={'gray.300'}
        borderWidth={0.5}
        borderRadius={'5px'}
        px={10}
      >
        <Table>
          <TableHeader>
            <Heading>Teams</Heading>
          </TableHeader>
          <TableCaption>Teams registered in the system</TableCaption>

          <Thead>
            <Tr>
              {isDrawerSidebar ? null : (
                <Th style={{ textAlign: 'center' }}>Detail</Th>
              )}
              <Th style={{ textAlign: 'center' }}>Id</Th>
              {isDrawerSidebar ? null : (
                <Th style={{ textAlign: 'center' }}>Created at</Th>
              )}
              <Th style={{ textAlign: 'center' }}>Status</Th>
              <Th style={{ textAlign: 'center' }}>Time</Th>
              {isDrawerSidebar ? null : (
                <Th style={{ textAlign: 'center' }}>Action</Th>
              )}
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
