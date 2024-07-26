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
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BiPlus } from 'react-icons/bi'

import { Pagination } from '@/components/pagination.tsx'
import { LoadingSpinner } from '@/components/ui/spinner.tsx'
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

      <TableContainer
        borderColor={'rgba(0, 0, 0, 0.4)'}
        borderWidth={0.1}
        borderRadius={'5px'}
        px={10}
      >
        <Button
          onClick={() => setOpen(true)}
          mt={5}
          color={'white'}
          bg={'#E11D48'}
          rightIcon={<Icon as={BiPlus} />}
        >
          Add
        </Button>

        <Heading mt={10}>Exercises</Heading>
        <Table>
          <TableCaption>Exercises registered in the system</TableCaption>
          <Thead>
            <Tr>
              {isDrawerSidebar ? null : <Th>Detail</Th>}
              {!isDrawerSidebar && <Th>Id</Th>}
              <Th>Name</Th>
              <Th style={{ textAlign: 'center' }}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody borderWidth={0}>
            {isFetching && (
              <Tr>
                <Td colSpan={3}>
                  <VStack alignItems={'center'} alignContent={'center'}>
                    <LoadingSpinner />
                  </VStack>
                </Td>
              </Tr>
            )}
            {data?.content.map((it, i) => {
              return <ExerciseTableRow key={i} data={it} currentPage={page} />
            })}
          </Tbody>
          <Tfoot>
            <Tr borderColor={'rgba(0, 0, 0, 0.4)'}>
              <Td colSpan={3} border={'none'}>
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
    </>
  )
}
