import { Container, Td, Tr, useBreakpointValue } from '@chakra-ui/react'
import { Edit, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button.tsx'
import { GetStudentTypeType } from '@/types/common-students.ts'

type StudentsTableRowProps = {
  data: GetStudentTypeType
  onOpen: () => void
}

export function StudentsTableRow({ data, onOpen }: StudentsTableRowProps) {
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate(`/training/${data.id}`)
  }
  
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <Tr>
      {isDrawerSidebar ? null : (
        <Td>
          <Button onClick={onOpen}>
            <Search className="h-3 w-3" />
          </Button>
        </Td>
      )}
      <Td>{data.id}</Td>
      <Td>{data.name}</Td>

      <Td>
        <Container
          display="flex"
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="outline" color="white" onClick={handleEditClick}>
            <Edit className="h-3 w-3" />
          </Button>
        </Container>
      </Td>
    </Tr>
  )
}
