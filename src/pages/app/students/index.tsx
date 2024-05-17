import { Helmet } from 'react-helmet-async'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { StudentsTableRow } from '@/pages/app/students/students-table-row.tsx'
import { useStudents } from '@/services/students.ts'

export function Students() {
  const { data, isFetching } = useStudents()

  return (
    <>
      <Helmet title="My Students" />
      <div className="flex w-full min-w-full flex-col gap-4">
        <h1 className={'text-3xl font-bold tracking-tight'}>My Students</h1>

        <div className="w-full min-w-full space-y-2.5">
          <div className="w-full min-w-full rounded-md border">
            {isFetching ? (
              <div className="mb-4 mt-4 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <Table className="mx-auto w-full md:max-w-[950px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-auto"></TableHead>
                    <TableHead className="w-auto">#</TableHead>
                    <TableHead className="flex-grow">Nome</TableHead>
                    <TableHead className="w-auto"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((it, i) => {
                    return <StudentsTableRow key={i} data={it} />
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
