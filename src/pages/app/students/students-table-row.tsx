import { Box, Button, Container, Td, Tr } from '@chakra-ui/react'
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
            base: 'row',
            lg: 'row',
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="outline"
            mr="2"
            color="white"
            _hover={{
              borderColor: '#F56559',
              color: '#F56559'
            }}
          >
            <Search className="mr-2 h-3 w-3"/>
            <Box display={{ base: 'none', lg: 'flex' }}> Search </Box>
          </Button>
          
          <Button
            variant="outline"
            onClick={handleEditClick}
            color="white"
            _hover={{
              borderColor: '#F56559',
              color: '#F56559'
            }}
          >
            <Edit className="mr-2 h-3 w-3" />
            <Box display={{ base: 'none', lg: 'flex' }}> Edit </Box>
          </Button>
        </Container>
      </Td>
    </Tr>
  )
}
