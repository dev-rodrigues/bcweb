import { Td, Tr } from '@chakra-ui/react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { ContentItemSchemaType } from '@/types/common-users.ts'

type UserTableRowProps = {
  key: number
  data: ContentItemSchemaType
}

export function UserTableRow({ key, data }: UserTableRowProps) {
  return (
    <Tr key={key}>
      <Td>{data.id}</Td>
      <Td>{data.name}</Td>

      <Td>
        <Button>
          <Search className="h-3 w-3" />
        </Button>
      </Td>
    </Tr>
  )
}
