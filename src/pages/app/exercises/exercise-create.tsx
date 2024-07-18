import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Loader2, SaveIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'
import { toast } from 'sonner'
import { z } from 'zod'

import { createExercise } from '@/api/exercise.ts'
import { InputForm } from '@/components/ui/form/Input.tsx'
import { TableHeader } from '@/components/ui/table.tsx'
import { queryClient } from '@/lib/react-query'
import { ExerciseCreateMuscleGroupRow } from '@/pages/app/exercises/exercise-create-muscle-group-row.tsx'
import {
  useExerciseMuscleGroup,
  useMember,
} from '@/services/exercise-muscle-group-hook.ts'
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
  const [groups, setGroups] = useState<number[]>([])

  const [selectedMember, setSelectedMember] = useState<string | undefined>(
    undefined,
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: exercisesType } = useExercisesType()
  const { data: muscleGroups, isFetching } =
    useExerciseMuscleGroup(selectedMember)

  const { data: members } = useMember()

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
    <Modal
      shouldCloseOnOverlayClick={false}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <Flex justify="flex-end">
        <Button type="button" onClick={() => setModalOpen(false)}>
          <FaRegTimesCircle size={25} />
        </Button>
      </Flex>

      <Box flex="1" borderRadius={8}>
        <Heading size="lg" fontWeight="normal">
          Add Exercise
        </Heading>
      </Box>

      <Divider my="6" borderColor="gray.700" />

      <Flex flexDirection={'row'}>
        <Flex
          w={'50%'}
          flex={1}
          mr={10}
          as="form"
          flexDirection="column"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputForm
            label={'Exercise name'}
            pk={'name'}
            type={'text'}
            {...register('name')}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select mt={5} onChange={field.onChange}>
                <option className="text-black" value="">
                  Exercise type...
                </option>
                {exercisesType?.map((it, key) => (
                  <option
                    className="text-black"
                    key={key}
                    value={it.id.toString()}
                  >
                    {it.name}
                  </option>
                ))}
              </Select>
            )}
          />

          <Button
            mt={5}
            disabled={!isValid}
            type="submit"
            bg={'green.500'}
            rightIcon={<SaveIcon />}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </Flex>
        <Flex direction={'column'} w={'50%'} h={80}>
          <Select
            mt={9}
            onChange={(e) => {
              setSelectedMember(e.target.value)
            }}
          >
            <option className="text-black" value="">
              Members...
            </option>
            {members?.map((it, key) => (
              <option className="text-black" key={key} value={it.id.toString()}>
                {it.name}
              </option>
            ))}
          </Select>

          <TableContainer
            overflow={'hidden'}
            mt={5}
            border={'inset'}
            borderColor={'gray.300'}
            borderWidth={0.5}
            borderRadius={'5px'}
            style={{
              width: '100%',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
          >
            <Table size={'sm'}>
              <TableHeader>
                <Heading p={2} size={'md'}>
                  Muscle Groups
                </Heading>
              </TableHeader>
              <Thead>
                <Tr>
                  <Th w={20} textAlign={'center'}></Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isFetching && (
                  <Tr>
                    <Td colSpan={2}>
                      <Loader2 className="mx-auto mt-5 animate-spin" />
                    </Td>
                  </Tr>
                )}
                {!isFetching &&
                  muscleGroups?.map((it, i) => {
                    return (
                      <ExerciseCreateMuscleGroupRow
                        key={i}
                        data={it}
                        handleAddGroup={handleAddGroup}
                        handleRemoveGroup={handleRemoveGroup}
                      />
                    )
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Modal>
  )
}
