import { useMutation } from '@tanstack/react-query'
import { Search, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { deleteExercise } from '@/api/exercise.ts'
import { queryClient } from '@/app.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx'
import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { ExerciseDetails } from '@/pages/app/exercises/exercise-details.tsx'
import { ContentItemSchemaType } from '@/types/common-exercise.ts'

type ExerciseTableRowProps = {
  key: number
  data: ContentItemSchemaType
  currentPage: number
}
export function ExerciseTableRow({
  key,
  data,
  currentPage,
}: ExerciseTableRowProps) {
  const mutation = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['exercise-paged', currentPage, 10],
        })
        .then(() => {
          toast.success('Exercício excluído com sucesso')
        })
    },
  })

  const onSubmit = () => {
    mutation.mutate(data.id)
  }

  return (
    <TableRow key={key}>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <ExerciseDetails data={data} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>
      <TableCell className="text-muted-foreground">{data.name}</TableCell>
      <TableCell>
        <Button variant="outline" onClick={() => onSubmit()}>
          <Trash2 className="mr-2 h-3 w-3" />
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  )
}
