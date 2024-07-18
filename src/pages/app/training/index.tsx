import {
  Flex,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { deletePhasingByCustomer } from '@/api/phasing.ts'
import { queryClient } from '@/app.tsx'
import { Button } from '@/components/ui/button.tsx'
import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { PhasingRow } from '@/pages/app/training/components/phasing-row.tsx'
import { AddPhasingModal } from '@/pages/app/training/modals/AddPhasingModal.tsx'
import { BuildTryingModal } from '@/pages/app/training/modals/BuildTryingModal.tsx'
import { useCustomerPhasing } from '@/services/customer-phasing-hook.ts'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

export function Training() {
  const { studentId } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenSearch,
    onOpen: onOpenSearch,
    onClose: onCloseSearch,
  } = useDisclosure()
  const { data, isFetching } = useCustomerPhasing(Number(studentId))
  const [selected, setSelected] = useState<GetCustomerPhasingType>()

  const mutation = useMutation({
    mutationFn: deletePhasingByCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries().then(() => {
        toast.success('Successfully Deleted')
      })
    },
  })

  const handleDeletePhasing = (id: number) => {
    mutation.mutate(id)
  }

  const handleSelect = (id: number) => {
    const localized = data?.find((it) => it.id === id)
    setSelected(localized)
    onOpenSearch()
  }

  const columnHelper = createColumnHelper<GetCustomerPhasingType>()

  const columns = [
    columnHelper.accessor('id', {
      header: () => 'Id',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <HStack spacing="4">
          <Button onClick={() => handleSelect(row.original.id)}>
            <Search className="h-3 w-3" />
          </Button>
          <Button
            disabled={isFetching}
            onClick={() => handleDeletePhasing(row.original.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </HStack>
      ),
    }),
  ]

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Flex direction={'column'} paddingRight={10} paddingLeft={10}>
      <Helmet title="Training" />

      <AddPhasingModal
        isOpen={isOpen}
        onRequestClose={onClose}
        studentId={Number(studentId)}
      />

      <BuildTryingModal
        phasing={selected}
        isOpen={isOpenSearch}
        onRequestClose={onCloseSearch}
      />

      <Button className={'mb-4'} onClick={onOpen}>
        New
      </Button>

      <TableContainer
        border="inset"
        borderColor="gray.300"
        borderWidth={0.1}
        borderRadius="5px"
        px={10}
      >
        <Flex alignItems="center">
          <Heading>{`Create your student's training`}</Heading>
          {isFetching && <LoadingSpinner className="ml-2" />}
        </Flex>
        <Table>
          <TableCaption>
            {`These are the divisions of your student's training`}
          </TableCaption>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta: { isNumeric?: boolean } | undefined =
                    header.column.columnDef.meta
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <PhasingRow key={row.id} row={row} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
