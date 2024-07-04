import { Button } from '@chakra-ui/react'
import { Edit, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { GetStudentTypeType } from '@/types/common-students.ts'

import React from 'react';



type StudentsTableRowProps = {
    data: GetStudentTypeType
}

type IconButtonProps = {
  icon: React.ReactElement,
  label: string,
  onClick: () => void
}

const IconButton: React.FC<IconButtonProps> = ({ label, onClick }) => {
  return (
    <Button variant="outline" onClick={onClick}>
      {label}
    </Button>
  );
}

export function ButtonStudents({ data }: StudentsTableRowProps) {
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate(`/training/${data.id}`)
  }

  return (
    <>
      <IconButton
        icon={<Search className="h-3 w-3" />}
        label="Search"
        onClick={() => {}}
      />

      <IconButton
        icon={<Edit className="mr-2 h-3 w-3" />}
        label="Edit"
        onClick={handleEditClick}
      />
    </>
  )
}

export default IconButton;