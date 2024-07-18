import { Td, Tr } from '@chakra-ui/react'
import { Cell, flexRender, Row, RowData } from '@tanstack/react-table'

interface PhasingRowProps {
  row: Row<RowData>
}

export function PhasingRow({ row }: PhasingRowProps) {
  return (
    <>
      <Tr key={row.id}>
        {row.getVisibleCells().map((cell: Cell<RowData, unknown>) => {
          const meta: { isNumeric?: boolean } | undefined =
            cell.column.columnDef.meta
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
