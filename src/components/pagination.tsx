import { useBreakpointValue } from '@chakra-ui/react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'

export interface PaginationProps {
  useLabel?: boolean
  pageIndex: number
  totalCount: number
  perPage: number
  handleNextPage?: () => void
  handlePrevPage?: () => void
  handleFirstPage?: () => void
  handleLastPage?: () => void
}

export function Pagination({
  useLabel = true,
  pageIndex,
  totalCount,
  perPage,
  handleNextPage,
  handlePrevPage,
  handleFirstPage,
  handleLastPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <div className="flex items-center justify-between">
      {useLabel && !isDrawerSidebar && (
        <span className="text-sm text-muted-foreground">
          Total de {totalCount} item(s)
        </span>
      )}

      <div className="flex items-center gap-6 lg:gap-8">
        {!isDrawerSidebar && (
          <div className="text-sm font-medium">
            Página {pageIndex + 1} de {pages}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            disabled={pageIndex === 0}
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleFirstPage}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            disabled={pageIndex === 0}
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePrevPage}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button
            disabled={pageIndex + 1 === pages}
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            disabled={pageIndex + 1 === pages}
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleLastPage}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
