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
      <Td textAlign={'center'}>{data.id}</Td>

      <Td textAlign={'center'}>{data.type}</Td>

      <Td textAlign={'center'}>{`R$ ${data.price}`}</Td>

      <Td textAlign={'center'}>
        <Button variant="outline">
          <Edit className="h-3 w-3" />
        </Button>
      </Td>
    </Tr>
  )
}
