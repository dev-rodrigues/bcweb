import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createExercise } from '@/api/exercise.ts'
import { queryClient } from '@/app.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { ExerciseCreateMuscleGroupRow } from '@/pages/app/exercises/exercise-create-muscle-group-row.tsx'
import { useExerciseMuscleGroup } from '@/services/exercise-muscle-group-hook.ts'
import { useExercisesType } from '@/services/exercise-type-hook.ts'
import { ExerciseFormType } from '@/types/common-exercise.ts'

type ExerciseCreateProps = {
  setModalOpen: (value: boolean) => void
  currentPage: number
}

export function ExerciseCreate({
  setModalOpen,
  currentPage,
}: ExerciseCreateProps) {
  const [groups, setGroups] = useState<number[]>([])
  const { data: exercisesType } = useExercisesType()
  const { data: muscleGroups } = useExerciseMuscleGroup()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ExerciseFormType>()

  const { mutate } = useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['exercise-paged', currentPage, 10],
        })
        .then(() => {
          console.log('invalidateQueries')
        })
        .catch(() => {
          toast.error('Erro ao atualizar lista de exercicíos')
        })
        .finally(() => {
          setModalOpen(false)
          reset()
          toast.success('Exercicío cadastrado com sucesso!')
        })
    },
    onError: () => {
      toast.error('Erro ao cadastrar exercicío')
    },
  })

  const onSubmit = (form: ExerciseFormType) => {
    form.groups = groups
    mutate(form)
  }

  const handleAddGroup = (id: number) => {
    if (!groups.includes(id)) {
      setGroups([...groups, id])
    }
  }

  const handleRemoveGroup = (id: number) => {
    setGroups(groups.filter((it) => it !== id))
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{`Cadastro de exercicío:`}</DialogTitle>
      </DialogHeader>
      <div className="space-x-6">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 space-y-2">
            <Label htmlFor="teamname">Nome</Label>
            <Input id="teamname" type="text" {...register('name')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {exercisesType?.map((it, key) => (
                      <SelectItem key={key} value={it.id.toString()}>
                        {it.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div
            className="space-y-2"
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            <Label htmlFor="tipo">Grupos</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[24px]"></TableHead>
                  <TableHead className="w-[140px]">#</TableHead>
                  <TableHead className="w-[180px]">Nome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {muscleGroups?.map((it, i) => {
                  return (
                    <ExerciseCreateMuscleGroupRow
                      key={i}
                      data={it}
                      handleAddGroup={handleAddGroup}
                      handleRemoveGroup={handleRemoveGroup}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <Button disabled={isSubmitting} className="w-full" type="submit">
            Salvar
          </Button>
        </form>
      </div>
    </DialogContent>
  )
}
