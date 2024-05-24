import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'

import { Pagination } from '@/components/pagination.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { ExerciseSelectTableRow } from '@/pages/app/training/components/exercise-select-table-row.tsx'
import { useExercises } from '@/services/exercises-hook.ts'
import {
  SearchExerciseForm,
  SearchExerciseFormType,
} from '@/types/common-exercise.ts'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export function AddExercisePhasingModal({ isOpen, onRequestClose }: Props) {
  const [page, setPage] = useState(0)
  const size = 4
  const { data } = useExercises(page, size)

  const { register } = useForm<SearchExerciseFormType>({
    resolver: zodResolver(SearchExerciseForm),
  })

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Flex justify="flex-end">
        <button type="button" onClick={onRequestClose}>
          <FaRegTimesCircle size={25} />
        </button>
      </Flex>
      <Box flex="1" borderRadius={8} overflow="auto">
        <Heading size="lg" fontWeight="normal">
          Add Exercise
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <Container
            w={'100%'}
            display={'flex'}
            flexDirection={{
              base: 'column',
              md: 'row',
            }}
            gap={{
              base: 2,
              md: 4,
            }}
          >
            <div>
              <Tooltip label={'Search by exercise name'}>
                <Label htmlFor="type">Exercise:</Label>
              </Tooltip>
              <Input
                id="type"
                type="text"
                style={{
                  width: '400px',
                }}
                {...register('name')}
              />
            </div>

            <div>
              <Button
                marginTop={{
                  base: 1,
                  md: 6,
                }}
                leftIcon={<SearchIcon />}
                type={'button'}
              />
            </div>
          </Container>

          <Table className="mx-auto w-full md:max-w-[950px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto"></TableHead>
                <TableHead className="w-auto">Id</TableHead>
                <TableHead className="w-auto">Nome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={'overflow-auto!'}>
              {data?.content.map((it, i) => {
                return <ExerciseSelectTableRow key={i} data={it} />
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
        </VStack>
      </Box>
    </Modal>
  )
}
