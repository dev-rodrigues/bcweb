import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'

import { Pagination } from '@/components/pagination.tsx'
import { ExerciseSelectTableRow } from '@/pages/app/training/components/exercise-select-table-row.tsx'
import {
  ContentItemSchemaType,
  GetExercisesType,
} from '@/types/common-exercise.ts'

interface Props {
  setPage: (page: number) => void
  data?: GetExercisesType | undefined
  handleAddExercise: (exercise: ContentItemSchemaType) => void
  page: number
  size: number
}

export function TabSelectExerciseTable({
  setPage,
  data,
  handleAddExercise,
  page,
  size,
}: Props) {
  return (
    <>
      <Table
        size={'sm'}
        // maxH={'300px'}
        style={{
          overflow: 'auto',
        }}
      >
        <Thead>
          <Th>Id</Th>
          <Th>Exercise</Th>
          <Th></Th>
        </Thead>
        <Tbody>
          {data?.content.map((it, i) => {
            return (
              <ExerciseSelectTableRow
                key={i}
                data={it}
                handleAddExercise={handleAddExercise}
              />
            )
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={3}>
              <Pagination
                pageIndex={page}
                totalCount={data?.total ? data?.total : 0}
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
                  const pages = (Math.ceil(totalCount / 10) || 1) - 1
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
