import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createExercise } from '@/api/exercise.ts'
import { queryClient } from '@/app.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { InputForm } from '@/components/ui/form/Input.tsx'
import { Label } from '@/components/ui/label.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { Separator } from '@/components/ui/separator.tsx'
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
import { GenericAppError } from '@/types/common.ts'
import { ExerciseFormType } from '@/types/common-exercise.ts'

type ExerciseCreateProps = {
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
  currentPage: number
}

const createExerciseForm = z.object({
  name: z.string().min(3).max(255),
  type: z.string(),
})

export function ExerciseCreate({
  modalOpen,
  setModalOpen,
  currentPage,
}: ExerciseCreateProps) {
  const { data: exercisesType } = useExercisesType()
  const { data: muscleGroups } = useExerciseMuscleGroup()

  const [groups, setGroups] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    formState: { isValid },
    handleSubmit,
    control,
    reset,
  } = useForm<ExerciseFormType>({
    resolver: zodResolver(createExerciseForm),
  })

  useEffect(() => {
    if (modalOpen) {
      reset()
    }
  }, [modalOpen, reset])

  const { mutate } = useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['exercise-paged', currentPage, 10],
        })
        .catch(() => {
          toast.error('Erro ao atualizar lista de exercicíos')
        })
        .finally(() => {
          setModalOpen(false)
          reset()
          toast.success('Exercicío cadastrado com sucesso!')
          setIsSubmitting(false)
        })
    },
    onError: (e: AxiosError<GenericAppError>) => {
      setIsSubmitting(false)
      reset()
      toast.error(e.response?.data.message || 'Erro ao cadastrar exercicío')
    },
  })

  const onSubmit = (form: ExerciseFormType) => {
    const modifiedForm = { ...form, groups }
    modifiedForm.name = modifiedForm.name.trimEnd()
    setIsSubmitting(true)
    mutate(modifiedForm)
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
            <InputForm pk={'teamname'} type={'text'} {...register('name')} />
          </div>

          <div className="mb-4 space-y-2">
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

          <Separator
            className={'mb-5'}
            style={{
              color: 'var(--color-neutral-500)',
            }}
          />

          <div
            className="space-y-2"
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            <Label htmlFor="tipo">Grupo Muscular</Label>
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

          <Button disabled={!isValid} className="w-full" type="submit">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar
          </Button>
        </form>
      </div>
    </DialogContent>
  )
}
