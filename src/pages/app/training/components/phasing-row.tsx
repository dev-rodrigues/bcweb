import { Td, Tr } from '@chakra-ui/react'
import { flexRender, Row, RowData } from '@tanstack/react-table'

interface PhasingRowProps {
  row: Row<RowData>
}

export function PhasingRow({ row }: PhasingRowProps) {
  return (
    <>
      <Tr key={row.id}>
        {row.getVisibleCells().map((cell: any) => {
          const meta: any = cell.column.columnDef.meta
          return (
            <Td key={cell.id} isNumeric={meta?.isNumeric}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Td>
          )
        })}
      </Tr>
    </>
  )
}
