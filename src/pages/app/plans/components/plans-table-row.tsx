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
      borderBottom={'solid'}
      borderColor={'rgba(0, 0, 0, 0.2)'}
      _hover={{
        transform: 'scale(1.01)',
        transition: 'transform 0.3s',
        opacity: 0.4,
      }}
    >
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
