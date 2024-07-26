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

import Loading from '@/components/loading.tsx'
import { Pagination } from '@/components/pagination.tsx'
import { UserTableRow } from '@/pages/app/users/user-table-row.tsx'
import { useUsers } from '@/services/users-hook.ts'

export function Users() {
  const [page, setPage] = useState(0)
  const size = 10
  const { data, isFetching } = useUsers(page, size)
  
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <>
      <Helmet title="Users" />
      {isFetching ? (
        <Loading />
      ) : (
        <TableContainer
          borderColor={'rgba(0, 0, 0, 0.4)'}
          borderWidth={0.1}
          borderRadius={'5px'}
          px={10}
        >
          <Heading mt={10}>Users</Heading>

          <Table>
            <TableCaption>Users registered in the system</TableCaption>
            <Thead>
              <Tr>
                {isDrawerSidebar ? null : <Th>Detail</Th>}
                <Th>Id</Th>
                <Th>Nome</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.content.map((it, i) => {
                return <UserTableRow key={i} data={it} />
              })}
            </Tbody>
            <Tfoot>
              <Tr border={'none'} borderColor={'rgba(0, 0, 0, 0.4)'}>
                <Td colSpan={4} border={'none'}>
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
