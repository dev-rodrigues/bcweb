import {
  Button,
  Heading,
  Icon,
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
import { BiPlus } from 'react-icons/bi'

import { Pagination } from '@/components/pagination.tsx'
import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { TableHeader } from '@/components/ui/table.tsx'
import { ExerciseCreate } from '@/pages/app/exercises/exercise-create.tsx'
import { ExerciseTableRow } from '@/pages/app/exercises/exercise-table-row.tsx'
import { useExercises } from '@/services/exercises-hook.ts'

export function Exercises() {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const size = 10
  const { data, isFetching } = useExercises(page, size)
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <>
      <Helmet title="Exercises" />

      <ExerciseCreate
        modalOpen={open}
        currentPage={page}
        setModalOpen={setOpen}
      />

      {isFetching ? (
        <div className="mb-4 mt-4 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <TableContainer
          border={'inset'}
          borderColor={'gray.300'}
          borderWidth={0.5}
          borderRadius={'5px'}
          px={10}
        >
          <Table>
            <TableHeader>
              <Heading>Exercises</Heading>

              <Button
                onClick={() => setOpen(true)}
                mt={5}
                color={'white'}
                bg={'#E11D48'}
                rightIcon={<Icon as={BiPlus} />}
              >
                Add
              </Button>
            </TableHeader>
            <TableCaption>Exercises registered in the system</TableCaption>
            <Thead>
              <Tr>
                {!isDrawerSidebar && <Th style={{ textAlign: 'center' }}>#</Th>}
                <Th style={{ textAlign: 'center' }}>Nome</Th>
                <Th style={{ textAlign: 'center' }}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.content.map((it, i) => {
                return <ExerciseTableRow key={i} data={it} currentPage={page} />
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td colSpan={3}>
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
