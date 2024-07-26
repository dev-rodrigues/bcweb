import { Td, Tr, useBreakpointValue } from '@chakra-ui/react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { ContentItemSchemaType } from '@/types/common-users.ts'

type UserTableRowProps = {
  key: number
  data: ContentItemSchemaType
}

export function UserTableRow({ key, data }: UserTableRowProps) {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <Tr key={key}>
      {isDrawerSidebar ? null : (
        <Td>
          <Button>
            <Search className="h-3 w-3" />
          </Button>
        </Td>
        )}
      <Td>{data.id}</Td>
      <Td>{data.name}</Td>
    </Tr>
  )
}
