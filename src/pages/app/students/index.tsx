import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { StudentModal } from '@/pages/app/students/modals/StudentModal.tsx'
import { StudentsTableRow } from '@/pages/app/students/students-table-row.tsx'
import { useStudents } from '@/services/students.ts'

export function Students() {
  const { data, isFetching } = useStudents()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Helmet title="My Students" />

      <StudentModal isOpen={isOpen} onRequestClose={onClose} />
      <TableContainer
        borderColor={'rgba(0, 0, 0, 0.4)'}
        borderWidth={0.1}
        borderRadius={'5px'}
        px={10}
      >
        <Heading>Students</Heading>
        <Table>
          <TableCaption>Yours students registered in the system</TableCaption>
          <Thead>
            <Tr>
              <Th borderColor={'rgba(0, 0, 0, 0.4)'}>Id</Th>
              <Th borderColor={'rgba(0, 0, 0, 0.4)'}>Nome</Th>
              <Th
                borderColor={'rgba(0, 0, 0, 0.4)'}
                style={{ textAlign: 'center' }}
              >
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {isFetching && (
              <Tr border={'solid'} borderColor={'rgba(0, 0, 0, 0.4)'}>
                <Td colSpan={3}>
                  <VStack alignItems={'center'} alignContent={'center'}>
                    <LoadingSpinner />
                  </VStack>
                </Td>
              </Tr>
            )}

            {data?.map((it, i) => {
              return <StudentsTableRow key={i} data={it} onOpen={onOpen} />
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
