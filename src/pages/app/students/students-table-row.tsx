import { Container, Td, Tr } from '@chakra-ui/react'
import { Edit, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button as UIButton } from '@/components/ui/button.tsx'
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
    <Tr
      borderBottom={'solid'}
      borderColor={'rgba(0, 0, 0, 0.2)'}
      _hover={{
        transform: 'scale(1.01)',
        transition: 'transform 0.3s',
        opacity: 0.4,
      }}
    >
      <Td>{data.id}</Td>
      <Td>{data.name}</Td>

      <Td>
        <Container
          display="flex"
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          <UIButton variant="outline" color="white" onClick={handleEditClick}>
            <Edit className="h-3 w-3" />
          </UIButton>

          <UIButton>
            <Search className="h-3 w-3" />
          </UIButton>
        </Container>
      </Td>
    </Tr>
  )
}
