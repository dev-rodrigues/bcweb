import { Td, Tr } from '@chakra-ui/react'
import { Edit } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { ContentPlanSchemaType } from '@/types/common-plan.ts'

type PlansTableRowProps = {
  data: ContentPlanSchemaType
}

export function PlansTableRow({ data }: PlansTableRowProps) {
  return (
    <Tr
      border={'solid'}
      borderColor={'rgba(0, 0, 0, 0.4)'}
      _hover={{
        transform: 'scale(1.05)',
        transition: 'transform 0.3s',
        opacity: 0.4,
      }}
      >
      <Td textAlign={'center'}>{data.id}</Td>

      <Td textAlign={'center'}>{data.type}</Td>

      <Td textAlign={'center'}>{`R$ ${data.price}`}</Td>

      <Td textAlign={'center'}>
        <Button>
          <Edit className="h-3 w-3" />
        </Button>
      </Td>
    </Tr>
  )
}
