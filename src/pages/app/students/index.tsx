import {
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { StudentsTableRow } from '@/pages/app/students/students-table-row.tsx'
import { useStudents } from '@/services/students.ts'

export function Students() {
  const { data, isFetching } = useStudents()

  return (
    <>
      <Helmet title="My Students" />
      <Container
        display={'flex'}
        width={'100%'}
        flexDirection={'column'}
        minW={'full'}
        gap={4}
      >
        <Heading>My Students</Heading>

        {isFetching ? (
          <div className="mb-4 mt-4 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>#</Th>
                  <Th>Nome</Th>
                  <Th></Th>
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
      </Container>
    </>
  )
}
