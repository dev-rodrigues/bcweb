import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { TableHeader } from '@/components/ui/table.tsx'
import { StudentsTableRow } from '@/pages/app/students/students-table-row.tsx'
import { useStudents } from '@/services/students.ts'

export function Students() {
  const { data, isFetching } = useStudents()

  return (
    <>
      <Helmet title="My Students" />

      {isFetching ? (
        <div className="mb-4 mt-4 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <TableContainer
          borderColor={'rgba(0, 0, 0, 0.4)'}
          borderWidth={0.1}
          borderRadius={'5px'}
          px={10}
        >
          <Table>
            <TableHeader>
              <Heading>Students</Heading>
            </TableHeader>
            <TableCaption>Yours students registered in the system</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Nome</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((it, i) => {
                return <StudentsTableRow key={i} data={it} />
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
