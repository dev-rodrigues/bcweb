import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useState } from 'react'
import { GrReturn } from 'react-icons/gr'
import { RiAdminFill } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { PhasingRow } from '@/pages/app/training/components/phasing-row.tsx'
import { AddPhasingModal } from '@/pages/app/training/modals/add-phasing-modal.tsx'
import { useCustomerPhasing } from '@/services/customer-phasing-hook.ts'

export function Training() {
  const navigate = useNavigate()
  const { studentId } = useParams()

  const { data, isFetching } = useCustomerPhasing(Number(studentId))

  const [openPhasing, setOpenPhasing] = useState(false)

  const handleModalPhasing = () => {
    setOpenPhasing(!openPhasing)
  }

  const handleBack = () => {
    navigate('/students')
  }

  return (
    <Flex direction="column" h="100vh">
      <Flex flex={1} width={'100%'} my="6" mx="auto" as="form" px="6">
        <Box width={'100%'} borderRadius={8} bg="gray.800" p="8">
          <Heading size="lg" fontWeight="normal">
            Build traing for your student
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          {isFetching ? (
            <div className="mb-4 mt-4 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <Flex gap={2}>
              <Button
                onClick={handleBack}
                backgroundColor="red.200"
                _hover={{ color:'white', bgColor: '#E11D48', fontWeight: 'bold'} }
                rightIcon={<Icon as={GrReturn} />}
              >
                Voltar
              </Button>

              <Button
                backgroundColor="blue.300"
                color="white"
                bg={'none'}
                _hover={{ color:'#f07d7d', borderColor: '#f07d7d'}}
                rightIcon={<Icon as={RiAdminFill} />}
                onClick={handleModalPhasing}
              >
                Add phasings
              </Button>

              <AddPhasingModal
                isOpen={openPhasing}
                onRequestClose={handleModalPhasing}
                studentId={Number(studentId)}
              />
            </Flex>
          )}

          <Divider my="6" borderColor="gray.700" />

          <Table
            maxH={'300px'}
            style={{
              overflow: 'auto',
            }}
          >
            <Thead>
              <Tr>Serie</Tr>
              <Tr></Tr>
            </Thead>
            <Tbody>
              {data?.map((it, i) => {
                return <PhasingRow key={i} data={it} />
              })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Flex>
  )
}
