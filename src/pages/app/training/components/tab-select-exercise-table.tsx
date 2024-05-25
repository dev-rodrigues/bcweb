import { Pagination } from '@/components/pagination.tsx'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
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
      <Table className="mx-auto w-full md:max-w-[950px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto">Id</TableHead>
            <TableHead className="w-auto">Nome</TableHead>
            <TableHead className="w-auto"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={'overflow-auto!'}>
          {data?.content.map((it, i) => {
            return (
              <ExerciseSelectTableRow
                key={i}
                data={it}
                handleAddExercise={handleAddExercise}
              />
            )
          })}
        </TableBody>
      </Table>

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
    </>
  )
}
