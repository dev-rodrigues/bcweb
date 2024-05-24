import { Button, Icon } from '@chakra-ui/react'
import { Edit2Icon } from 'lucide-react'

import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { GetCustomerPhasingType } from '@/types/common-customer-phasing.ts'

interface PhasingRowProps {
  data: GetCustomerPhasingType
}

export function PhasingRow({ data }: PhasingRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>
      <TableCell className="w-full font-mono text-xs font-medium">
        {data.name}
      </TableCell>
      <TableCell className="w-full font-mono text-xs font-medium">
        <Button
          backgroundColor="pink.300"
          rightIcon={<Icon as={Edit2Icon} />}
        ></Button>
      </TableCell>
    </TableRow>
  )
}
