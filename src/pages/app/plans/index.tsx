import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { TableHeader } from '@/components/ui/table.tsx'
import { PlansTableRow } from '@/pages/app/plans/components/plans-table-row.tsx'
import { usePlans } from '@/services/plans-hook.ts'

export function Plans() {
  // const [open, setOpen] = useState(false)
  const { data, isFetching } = usePlans()

  // const handleOpen = () => {
  //   setOpen(!open)
  // }

  return (
    <>
      <Helmet title={'Plans'} />

      {/* <Button */}
      {/*  onClick={handleOpen} */}
      {/*  style={{ */}
      {/*    border: 'none', */}
      {/*    borderColor: 'transparent', */}
      {/*  }} */}
      {/*  size="xs" */}
      {/* > */}
      {/*  Novo */}
      {/* </Button> */}

      {/* <CreatePlan onRequestClose={handleOpen} isOpen={open} /> */}

      {isFetching ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : data?.length ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <Heading>My Plans</Heading>
            </TableHeader>
            <TableCaption>Yours plans registered in the system</TableCaption>

            <Thead>
              <Tr>
                <Th style={{ textAlign: 'center' }}>Id</Th>
                <Th style={{ textAlign: 'center' }}>Type</Th>
                <Th style={{ textAlign: 'center' }}>Price</Th>
                <Th style={{ textAlign: 'center' }}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((it, i) => {
                return <PlansTableRow data={it} key={i} />
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <p>Nenhum plano disponível</p>
      )}
    </>
  )
}
