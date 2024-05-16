import { CSSProperties } from 'react'
import { useAsync } from 'react-async'

import { Table, TableHead, TableHeader } from '@/components/ui/table.tsx'

type Column = {
  name: string
  style: CSSProperties
}

interface Data {
  [key: string]: any
}

type TableProps<T extends Data = Data> = {
  columns: Column[]
  fetchHook: (params: any) => Promise<{ data: T[]; isFetching: boolean }>
}

export function LocalTable<T extends Data = Data>({
  columns,
  fetchHook,
}: TableProps<T>) {
  const { data } = useAsync(fetchHook, {
    initialData: { data: [] as T[], isFetching: true },
  })

  console.log(data)

  return (
    <Table>
      <TableHeader>
        {columns.map((column, index) => (
          <TableHead key={index} style={column.style}>
            {column.name}
          </TableHead>
        ))}
      </TableHeader>
    </Table>
  )
}
