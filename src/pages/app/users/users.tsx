import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
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

  return (
    <>
      <Helmet title="Users" />
      <div className="flex flex-col gap-4">
        <h1 className={'text-3xl font-bold tracking-tight'}>Users</h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            {isFetching ? (
              <Loading />
            ) : (
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th>#</Th>
                      <Th>Nome</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.content.map((it, i) => {
                      return <UserTableRow key={i} data={it} />
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </div>

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
        </div>
      </div>
    </>
  )
}
