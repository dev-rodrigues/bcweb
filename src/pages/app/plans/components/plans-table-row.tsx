import { Button } from '@chakra-ui/react'
import { Edit } from 'lucide-react'

import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { ContentPlanSchemaType } from '@/types/common-plan.ts'

type PlansTableRowProps = {
  data: ContentPlanSchemaType
}

export function PlansTableRow({ data }: PlansTableRowProps) {
  return (
    <TableRow>
      <TableCell>{data.id}</TableCell>

      <TableCell className="font-mono text-xs font-medium md:text-sm">
        {data.type}
      </TableCell>

      <TableCell className="text-muted-foreground">{`R$ ${data.price}`}</TableCell>

      <TableCell>
        <Button variant="outline">
          <Edit className="mr-2 h-3 w-3" />
          Edit
        </Button>
      </TableCell>
    </TableRow>
  )
}
