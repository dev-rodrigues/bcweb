import { Container, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button.tsx'
import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { PlansTableRow } from '@/pages/app/plans/components/plans-table-row.tsx'
import { CreatePlan } from '@/pages/app/plans/create'
import { usePlans } from '@/services/plans-hook.ts'

export function Plans() {
  const [open, setOpen] = useState(false)
  const { data, isFetching } = usePlans()

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <Helmet title={'Plans'} />
      <Container
        display={'flex'}
        width={'100%'}
        flexDirection={'column'}
        minW={'full'}
        gap={4}
      >
        <Heading>My Plans</Heading>

        <div className="w-full min-w-full space-y-2.5">
          <Button
            onClick={handleOpen}
            style={{
              border: 'none',
              borderColor: 'transparent',
            }}
            size="xs"
          >
            Novo
          </Button>
          <CreatePlan onRequestClose={handleOpen} isOpen={open} />

          <div className="w-full min-w-full rounded-md border">
            {isFetching ? (
              <div className="mb-4 mt-4 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : data?.length ? (
              <Table className="mx-auto mb-5 w-full md:max-w-[950px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-auto">#</TableHead>
                    <TableHead className="flex-grow">Type</TableHead>
                    <TableHead className="w-auto">Price</TableHead>
                    <TableHead className="w-auto"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((it, i) => {
                    return <PlansTableRow data={it} key={i} />
                  })}
                </TableBody>
              </Table>
            ) : (
              <p>Nenhum plano disponível</p>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}
