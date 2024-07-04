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
    <Tr key={key} alignContent={'center'} alignItems={'center'}>
      <Td textAlign={'center'}>{data.id}</Td>
      <Td textAlign={'center'}>{data.name}</Td>

      <Td textAlign={'center'}>
        <Button>
          <Search className="h-3 w-3" />
        </Button>
      </Td>
    </Tr>
  )
}
