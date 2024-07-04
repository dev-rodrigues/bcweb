import { Button, Container, Td, Tr } from '@chakra-ui/react'
import { Edit, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


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
          <Button variant="outline" color="white" _hover={{ color:'#f07d7d', borderColor: '#f07d7d'}} mr={'2'}>
            <Search className="h-4 w-4"/>
          </Button>
          <Button variant="outline" onClick={handleEditClick} color="white" _hover={{ color:'#f07d7d', borderColor: '#f07d7d'}}>
            <Edit className="mr-2 h-3 w-3" />
            Edit
          </Button>
        </Container>
      </Td>
    </Tr>
  )
}
