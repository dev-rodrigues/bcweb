import { Td, Tr } from '@chakra-ui/react'
import { Edit } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { ContentPlanSchemaType } from '@/types/common-plan.ts'

type PlansTableRowProps = {
  data: ContentPlanSchemaType
}

export function PlansTableRow({ data }: PlansTableRowProps) {
  return (
    <Tr>
      <Td>{data.id}</Td>
      <Td>{data.type}</Td>
      <Td>{`R$ ${data.price}`}</Td>
      <Td>
        <Button>
          <Edit className="h-3 w-3" />
        </Button>
      </Td>
    </Tr>
  )
}
