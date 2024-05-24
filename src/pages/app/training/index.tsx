import { Box, Button, Divider, Flex, Heading, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { BiSave } from 'react-icons/bi'
import { GrReturn } from 'react-icons/gr'
import { RiAdminFill } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { PhasingRow } from '@/pages/app/training/components/phasing-row.tsx'
import { AddPhasingModal } from '@/pages/app/training/modals/add-phasing-modal.tsx'
import { useCustomerPhasing } from '@/services/customer-phasing-hook.ts'

export function Training() {
  const navigate = useNavigate()
  const { studentId } = useParams()

  const { data, isFetching } = useCustomerPhasing(52)

  const [open, setOpen] = useState(false)

  const handleModal = () => {
    setOpen(!open)
  }

  const handleBack = () => {
    navigate('/students')
  }

  return (
    <Flex direction="column" h="100vh">
      <Flex flex={1} width={'100%'} my="6" mx="auto" as="form" px="6">
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Heading size="lg" fontWeight="normal">
            Build traing for your student
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          {isFetching ? (
            <div className="mb-4 mt-4 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <Flex>
              <Button
                backgroundColor="pink.300"
                rightIcon={<Icon as={RiAdminFill} />}
                onClick={handleModal}
              >
                Add phasings
              </Button>
              <AddPhasingModal
                isOpen={open}
                onRequestClose={handleModal}
                studentId={Number(studentId)}
              />
            </Flex>
          )}

          <Divider my="6" borderColor="gray.700" />

          <Table className="mx-auto w-full md:max-w-[950px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto">#</TableHead>
                <TableHead className="flex-grow">Serie</TableHead>
                <TableHead className="w-auto"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((it, i) => {
                return <PhasingRow key={i} data={it} />
              })}
            </TableBody>
          </Table>

          <Flex
            justifyContent={'flex-end'}
            width={'100%'}
            gap={2}
            marginTop={5}
          >
            <Button
              onClick={handleBack}
              backgroundColor="pink.300"
              rightIcon={<Icon as={GrReturn} />}
            >
              Return
            </Button>
            <Button
              // onClick={save}
              backgroundColor="green.300"
              rightIcon={<Icon as={BiSave} />}
            >
              Save
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}
