import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'

export function TeamTableFilter() {
  return (
    <form className={'flex gap-2'}>
      {/* <Input placeholder="Id" className="h-8 w-auto" /> */}
      {/* <Input placeholder="Nome do time" className="h-8 w-[320px]" /> */}
      <Select defaultValue="none">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem unselectable="on" value="none">
            Selecione
          </SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="approved">Aprovado</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" variant={'secondary'} size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar
      </Button>

      <Button type="button" variant={'outline'} size="xs">
        <X className="mr-2 h-4 w-4" />
        Remover
      </Button>
    </form>
  )
}
