import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx'
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
  const [open, setOpen] = useState(false)

  const { data, isFetching } = useStudents()

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <Helmet title="My Students" />
      <div className="flex flex-col gap-4">
        <h1 className={'text-3xl font-bold tracking-tight'}>My Students</h1>

        <div>
          <Button>
            <Dialog open={open} onOpenChange={handleOpen}>
              <DialogTrigger asChild>
                <Button size="xs">Novo</Button>
              </DialogTrigger>
            </Dialog>
          </Button>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-md border">
            {isFetching ? (
              <div className="mb-4 mt-4 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
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
