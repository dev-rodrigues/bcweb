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
import { TableHeader } from '@/components/ui/table.tsx'
import { PhasingRow } from '@/pages/app/training/components/phasing-row.tsx'
import { AddPhasingModal } from '@/pages/app/training/modals/add-phasing-modal.tsx'
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
        <Table size={'sm'}>
          <TableHeader>
            <Heading>{`Create your student's training`}</Heading>
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
          </TableHeader>
          <TableCaption>
            {`These are the divisions of your student's training`}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th textAlign={'center'}>Serie</Th>
              <Th textAlign={'center'}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isFetching && (
              <Tr>
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
