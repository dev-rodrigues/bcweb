import { Td, Tr } from '@chakra-ui/react'
import { Edit, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button.tsx'
import { GetStudentTypeType } from '@/types/common-students.ts'

type StudentsTableRowProps = {
  data: GetStudentTypeType
}

export function StudentsTableRow({ data }: StudentsTableRowProps) {
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate(`/training/${data.id}`)
  }

  return (
    <Tr>
      <Td>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </Td>

      {/* <TableCell> */}
      {/*  <Dialog> */}
      {/*    <DialogTrigger asChild> */}
      {/*      <Button variant="outline" size="xs"> */}
      {/*        <Search className="h-3 w-3" /> */}
      {/*        <span className="sr-only">Detalhes do pedido</span> */}
      {/*      </Button> */}
      {/*    </DialogTrigger> */}
      {/*    <StudentDetail data={data} /> */}
      {/*  </Dialog> */}
      {/* </TableCell> */}

      <Td>{data.id}</Td>

      <Td>{data.name}</Td>

      <Td>
        <Button variant="outline" onClick={handleEditClick}>
          <Edit className="mr-2 h-3 w-3" />
          Edit
        </Button>
      </Td>
    </Tr>
  )
}
