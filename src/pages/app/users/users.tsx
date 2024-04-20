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
import { UserTableRow } from '@/pages/app/users/user-table-row.tsx'
import { useUsers } from '@/services/users-hook.ts'

export function Users() {
  const [page, setPage] = useState(0)
  const size = 10
  const { data } = useUsers(page, size)

  return (
    <>
      <Helmet title="Users" />
      <div className="flex flex-col gap-4">
        <h1 className={'text-3xl font-bold tracking-tight'}>Users</h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[24px]"></TableHead>
                  <TableHead className="w-[140px]">#</TableHead>
                  <TableHead className="w-[180px]">Nome</TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.content.map((it, i) => {
                  return <UserTableRow key={i} data={it} />
                })}
              </TableBody>
            </Table>
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
