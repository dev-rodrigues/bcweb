import { Container, Td, Tr } from '@chakra-ui/react'
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
      <Td>{data.id}</Td>

      <Td>{data.name}</Td>

      <Td>
        <Container
          display="flex"
          flexDirection={{
            base: 'column',
            lg: 'row',
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="outline">
            <Search className="h-3 w-3" />
          </Button>
          <Button variant="outline" onClick={handleEditClick}>
            <Edit className="mr-2 h-3 w-3" />
            Edit
          </Button>
        </Container>
      </Td>
    </Tr>
  )
}
