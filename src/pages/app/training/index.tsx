import {
  Button,
  Heading,
  Icon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BiPlus } from 'react-icons/bi'
import { useParams } from 'react-router-dom'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { PhasingRow } from '@/pages/app/training/components/phasing-row.tsx'
import { AddPhasingModal } from '@/pages/app/training/modals/AddPhasingModal.tsx'
import { useCustomerPhasing } from '@/services/customer-phasing-hook.ts'

export function Training() {
  const { studentId } = useParams()

  const { data: phasings, isFetching } = useCustomerPhasing(Number(studentId))

  const [openPhasing, setOpenPhasing] = useState(false)

  const handleModalPhasing = () => {
    setOpenPhasing(!openPhasing)
  }

  return (
    <>
      <Helmet title="Training" />

      <AddPhasingModal
        isOpen={openPhasing}
        onRequestClose={handleModalPhasing}
        studentId={Number(studentId)}
      />

      <TableContainer
        border={'inset'}
        borderColor={'gray.300'}
        borderWidth={0.1}
        borderRadius={'5px'}
        px={10}
      >
        <Button
          mt={5}
          mb={5}
          color={'white'}
          bg={'#E11D48'}
          rightIcon={<Icon as={BiPlus} />}
          onClick={handleModalPhasing}
        >
          Add
        </Button>

        <Heading>{`Create your student's training`}</Heading>
        <Table size={'sm'}>
          <TableCaption>
            {`These are the divisions of your student's training`}
          </TableCaption>
          <Thead>
            <Tr>
              <Th borderColor={'rgba(0, 0, 0, 0.4)'}>Id</Th>
              <Th borderColor={'rgba(0, 0, 0, 0.4)'}>Serie</Th>
              <Th borderColor={'rgba(0, 0, 0, 0.4)'} textAlign={'center'}>
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
            {phasings?.map((it, i) => {
              return <PhasingRow key={i} data={it} />
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
