import { Container, Heading, useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination.tsx'
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
import { ExerciseCreate } from '@/pages/app/exercises/exercise-create.tsx'
import { ExerciseTableRow } from '@/pages/app/exercises/exercise-table-row.tsx'
import { useExercises } from '@/services/exercises-hook.ts'

export function Exercises() {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const size = 10
  const { data, isFetching } = useExercises(page, size)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <Helmet title="Exercises" />
      <Container
        display={'flex'}
        width={'100%'}
        flexDirection={'column'}
        minW={'full'}
        gap={4}
      >
        <Heading>Exercises</Heading>

        <div className="w-full min-w-full space-y-2.5">
          <Dialog open={open} onOpenChange={handleOpen}>
            <DialogTrigger asChild>
              <Button
                style={{
                  border: 'none',
                  borderColor: 'transparent',
                }}
                size="xs"
              >
                Novo
              </Button>
            </DialogTrigger>
            <ExerciseCreate
              modalOpen={open}
              setModalOpen={setOpen}
              currentPage={page}
            />
          </Dialog>

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
                    {isDrawerSidebar && (
                      <TableHead className="w-auto">#</TableHead>
                    )}
                    <TableHead className="flex-grow">Nome</TableHead>
                    <TableHead className="w-auto"></TableHead>
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
      </Container>
    </>
  )
}
