import {
  Table,
  TableCaption,
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

import Loading from '@/components/loading.tsx'
import { Pagination } from '@/components/pagination.tsx'
import { TableHeader } from '@/components/ui/table.tsx'
import { UserTableRow } from '@/pages/app/users/user-table-row.tsx'
import { useUsers } from '@/services/users-hook.ts'

export function Users() {
  const [page, setPage] = useState(0)
  const size = 10
  const { data, isFetching } = useUsers(page, size)

  return (
    <>
      <Helmet title="Users" />
      {isFetching ? (
        <Loading />
      ) : (
        <TableContainer
          border={'inset'}
          borderColor={'gray.300'}
          borderWidth={0.5}
          borderRadius={'5px'}
          px={10}
        >
          <Table>
            <TableHeader>Users</TableHeader>
            <TableCaption>Users registered in the system</TableCaption>
            <Thead>
              <Tr>
                <Th style={{ textAlign: 'center' }}>Id</Th>
                <Th style={{ textAlign: 'center' }}>Nome</Th>
                <Th style={{ textAlign: 'center' }}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.content.map((it, i) => {
                return <UserTableRow key={i} data={it} />
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td colSpan={4}>
                  <Pagination
                    pageIndex={page}
                    totalCount={data?.total ? data?.total : 0}
                    perPage={10}
                    handleNextPage={() => {
                      setPage(page + 1)
                    }}
                    handlePrevPage={() => {
                      setPage(page - 1)
                    }}
                    handleFirstPage={() => {
                      setPage(0)
                    }}
                    handleLastPage={() => {
                      const totalCount = data?.total ? data?.total : 0
                      const pages = (Math.ceil(totalCount / 10) || 1) - 1
                      setPage(pages)
                    }}
                  />
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
