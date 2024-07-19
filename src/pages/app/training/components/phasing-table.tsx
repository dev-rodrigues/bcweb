import {
  Button,
  ModalFooter,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { postPhasingByCustomer } from '@/api/phasing.ts'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { TableHeader } from '@/components/ui/table.tsx'
import { queryClient } from '@/lib/react-query'
import { PostCustomerPhasingType } from '@/types/common-customer-phasing.ts'
import { Phasing } from '@/types/common-phasing.ts'

type Props = {
  data: Phasing[] | undefined
  onRequestClose: () => void
  studentId?: number | undefined
}

interface ItProps {
  data: Phasing
  selected: boolean
}

export function PhasingTable({ data, onRequestClose, studentId }: Props) {
  const [it, setIt] = useState<ItProps[]>([])

  useEffect(() => {
    if (data) {
      setIt(data.map((it) => ({ data: it, selected: false })))
    }
  }, [data])

  function handleSelect(id: number) {
    setIt(
      it.map((it) => {
        if (it.data.id === id) {
          return { ...it, selected: !it.selected }
        }
        return it
      }),
    )
  }

  const { mutate } = useMutation({
    mutationFn: postPhasingByCustomer,
    onSuccess: () => {
      queryClient
        .invalidateQueries()
        .then(() => {
          toast.success('Phasing saved.')
        })
        .finally(() => {
          onRequestClose()
        })
    },
    onError: () => {
      toast.error('Error saving phasing.')
    },
  })

  function save() {
    const selected = it.filter((it) => it.selected).map((it) => it.data)

    if (selected.length === 0) {
      toast.error('Select at least one item.')
      return
    }

    mutate(map(selected))
  }

  function map(selected: Phasing[]): PostCustomerPhasingType {
    return {
      id: studentId,
      phasings: selected.map((it) => ({
        id: it.id,
        name: it.name,
      })),
    } as PostCustomerPhasingType
  }

  return (
    <>
      <TableContainer
        border={'inset'}
        borderColor={'gray.300'}
        borderWidth={0.1}
        borderRadius={'5px'}
        px={10}
      >
        <TableHeader>Available Phasing</TableHeader>
        <Table size={'sm'}>
          <TableCaption>{`Phases of your student's training`}</TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Id</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {it?.map((it, i) => {
              return (
                <Tr key={i}>
                  <Td textAlign={'center'}>
                    <Checkbox
                      onCheckedChange={(checked: boolean) => {
                        return checked
                          ? handleSelect(it.data.id)
                          : handleSelect(it.data.id)
                      }}
                    />
                  </Td>

                  <Td>{it.data.id}</Td>
                  <Td width={'100%'}>{`${it.data.name}`}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalFooter>
        <Button colorScheme="red" mr={3} onClick={onRequestClose}>
          Close
        </Button>
        <Button onClick={() => save()}>Save</Button>
      </ModalFooter>
    </>
  )
}
