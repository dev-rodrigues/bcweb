import { Button, Checkbox, Flex, Icon } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BiSave } from 'react-icons/bi'
import { LuPanelLeft } from 'react-icons/lu'
import { toast } from 'sonner'

import { postPhasingByCustomer } from '@/api/phasing.ts'
import { queryClient } from '@/app.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
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
        .invalidateQueries({
          queryKey: ['customer-phasing', 52],
        })
        .then(() => {
          toast.success('Phasing saved.')
        })
    },
    onError: () => {
      toast.error('Error saving phasing.')
    },
    onMutate: () => {
      onRequestClose()
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
      id: studentId!,
      phasings: selected.map((it) => ({
        id: it.id,
        name: it.name,
      })),
    }
  }

  return (
    <div className="w-full min-w-full rounded-md border ">
      <Table className="bg mx-auto w-full md:max-w-[750px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto"></TableHead>
            <TableHead className="w-auto">#</TableHead>
            <TableHead className="flex-grow">Nome</TableHead>
          </TableRow>
        </TableHeader>
        {it?.map((it, i) => {
          return (
            <TableBody key={i}>
              <TableRow>
                <TableCell>
                  <Checkbox
                    borderColor={'white'}
                    isChecked={it.selected}
                    size="lg"
                    onChange={() => {
                      handleSelect(it.data.id)
                    }}
                  />
                </TableCell>
                <TableCell>
                  <p>{it.data.id}</p>
                </TableCell>
                <TableCell width={'100%'}>
                  <p>{`${it.data.name}`}</p>
                </TableCell>
                <TableCell width={'100%'}>
                  <Button leftIcon={<LuPanelLeft />} />
                </TableCell>
              </TableRow>
            </TableBody>
          )
        })}
      </Table>
      <Flex justifyContent={'flex-start'} width={'100%'} mt={4}>
        <Button
          onClick={save}
          backgroundColor="green.300"
          rightIcon={<Icon as={BiSave} />}
        >
          Save
        </Button>
      </Flex>
    </div>
  )
}
