import { Container, Text, Tooltip } from '@chakra-ui/react'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { TableCell, TableRow } from '@/components/ui/table.tsx'

type PlanCreateRowProps = {
  key: number
  label: string
  handleDelete: (index: number) => void
}

export function PlanCreateRow({
  key,
  label,
  handleDelete,
}: PlanCreateRowProps) {
  // const [lineThrough, seLineThrough] = useState(false)

  // function handleLineThrough() {
  //   seLineThrough(!lineThrough)
  // }

  return (
    <TableRow key={key}>
      <TableCell className="text-muted-foreground">
        <Text
          style={{
            textDecorationColor: '#E11D48',
          }}
          // className={lineThrough ? 'line-through' : ''}
          fontSize={20}
        >
          {label}
        </Text>
      </TableCell>
      <TableCell>
        <Container display={'flex'} flexDirection={'row'} gap={2}>
          {/* <Tooltip label={'Cross out the offer'}> */}
          {/*  <Button */}
          {/*    variant="outline" */}
          {/*    type={'button'} */}
          {/*    onClick={() => handleLineThrough()} */}
          {/*  > */}
          {/*    <Edit className="h-3 w-3" /> */}
          {/*  </Button> */}
          {/* </Tooltip> */}

          <Tooltip label={'Delete offer'}>
            <Button
              variant="outline"
              type={'button'}
              onClick={() => handleDelete(key)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </Tooltip>
        </Container>
      </TableCell>
    </TableRow>
  )
}
