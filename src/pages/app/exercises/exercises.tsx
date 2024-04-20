import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { ExerciseCreate } from '@/pages/app/exercises/exercise-create.tsx'
import { ExerciseTableRow } from '@/pages/app/exercises/exercise-table-row.tsx'
import { useExercises } from '@/services/exercises-hook.ts'

export function Exercises() {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const size = 10
  const { data } = useExercises(page, size)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <Helmet title="Exercises" />
      <div className="flex flex-col gap-4">
        <h1 className={'text-3xl font-bold tracking-tight'}>Exercícios</h1>
        <div>
          <Button>
            <Dialog open={open} onOpenChange={handleOpen}>
              <DialogTrigger asChild>
                <Button size="xs">Novo</Button>
              </DialogTrigger>
              <ExerciseCreate setModalOpen={setOpen} currentPage={page} />
            </Dialog>
          </Button>
        </div>

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
                  return (
                    <ExerciseTableRow key={i} data={it} currentPage={page} />
                  )
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
