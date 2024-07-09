import {
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'

import { Pagination } from '@/components/pagination.tsx'
import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { ExerciseSelectTableRow } from '@/pages/app/training/components/exercise-select-table-row.tsx'
import {
  SearchExercisePagedResponse,
  SearchExerciseResponse,
} from '@/pages/app/training/wip/BuildTryingSearchExercises.tsx'

interface Props {
  setPage: (page: number) => void
  data: SearchExercisePagedResponse | undefined
  handleAddExercise: (exercise: SearchExerciseResponse) => void
  page: number
  size: number
  isFetching?: boolean
}

export function TabSelectExerciseTable({
  setPage,
  data,
  handleAddExercise,
  page,
  size,
  isFetching = false,
}: Props) {
  return (
    <>
      <Table size={'sm'}>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Exercise</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {isFetching && (
            <Tr key={'span'}>
              <Td colSpan={3}>
                <VStack alignItems={'center'} alignContent={'center'}>
                  <LoadingSpinner />
                </VStack>
              </Td>
            </Tr>
          )}
          {data?.content?.map((it, index) => (
            <ExerciseSelectTableRow
              key={index}
              id={index}
              data={it}
              handleAddExercise={handleAddExercise}
            />
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={3}>
              <Pagination
                useLabel={false}
                pageIndex={page}
                totalCount={data?.total ? data.total : 0} // exercises?.total ? exercises?.total : 0}
                perPage={size}
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
                  const pages = Math.ceil(totalCount / size) - 1 // Use 'size' instead of hardcoding '10'
                  setPage(pages)
                }}
              />
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </>
  )
}
