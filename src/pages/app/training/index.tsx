import { Box, Button, Divider, Flex, Heading, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { BiSave } from 'react-icons/bi'
import { GrReturn } from 'react-icons/gr'
import { RiAdminFill } from 'react-icons/ri'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { AddPhasingModal } from '@/pages/app/training/modals/add-phasing-modal.tsx'
import { useCustomerPhasing } from '@/services/customer-phasing-hook.ts'

export function Training() {
  const { data, isFetching } = useCustomerPhasing(52)
  const [open, setOpen] = useState(false)

  const handleModal = () => {
    setOpen(!open)
  }

  return (
    <Flex direction="column" h="100vh">
      <Flex
        flex={1}
        width={'100%'}
        my="6"
        mx="auto"
        as="form"
        // onSubmit={handleSubmit(handleCreate)}
        px="6"
      >
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Heading size="lg" fontWeight="normal">
            Build traing for your student
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          {isFetching ? (
            <div className="mb-4 mt-4 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : data?.length > 0 ? (
            data.map((it, i) => <h1 key={i}>{`${it.name} - ${i}`}</h1>)
          ) : (
            <Flex>
              <Button
                backgroundColor="pink.300"
                rightIcon={<Icon as={RiAdminFill} />}
                onClick={handleModal}
              >
                Add phasings
              </Button>
              <AddPhasingModal isOpen={open} onRequestClose={handleModal} />
            </Flex>
          )}

          <Divider my="6" borderColor="gray.700" />

          <Flex justifyContent={'flex-end'} width={'100%'} gap={2}>
            <Button
              // onClick={save}
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
