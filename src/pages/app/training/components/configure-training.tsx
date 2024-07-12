import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { InputForm } from '@/components/ui/form/Input.tsx'
import { SearchExerciseResponse } from '@/pages/app/training/tabs/TabBuildTryingSearchExercises.tsx'

const configureTrainingFormSchema = z.object({
  totalSeries: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'Total series must be a number',
    })
    .refine((val) => val >= 1, {
      message: 'Total series must be at least 1',
    })
    .refine((val) => val <= 99, {
      message: 'Total series must be at most 99',
    }),
  totalRepetitions: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'Total repetitions must be a number',
    })
    .refine((val) => val >= 1, {
      message: 'Total repetitions must be at least 1',
    })
    .refine((val) => val <= 99, {
      message: 'Total repetitions must be at most 99',
    }),
  rest: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'Rest time must be a number',
    })
    .refine((val) => val >= 1, {
      message: 'Rest time must be at least 1 second',
    })
    .refine((val) => val <= 999, {
      message: 'Rest time must be at most 99 seconds',
    }),
  weight: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'Weight must be a number',
    })
    .refine((val) => val >= 1, {
      message: 'Weight must be at least 1 unit',
    })
    .refine((val) => val <= 9999, {
      message: 'Weight must be at most 99 units',
    }),
})

export type ConfigureTrainingForm = z.infer<typeof configureTrainingFormSchema>

type Props = {
  isOpen: boolean
  onClose: () => void
  exercise: SearchExerciseResponse | null
  handleUpdateBag: (key: string, config: ConfigureTrainingForm) => void
}

export function ConfigureTraining({
  handleUpdateBag,
  exercise,
  isOpen,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<ConfigureTrainingForm>({
    resolver: zodResolver(configureTrainingFormSchema),
  })

  const onSubmit = (form: ConfigureTrainingForm) => {
    if (exercise) {
      handleUpdateBag(exercise.key, form)
      toast.success('Training configured successfully')
      reset({})
      onClose()
    } else {
      toast.error('No exercise selected')
    }
  }

  useEffect(() => {
    console.log(exercise)
    if (exercise && exercise.bag) {
      setValue('totalSeries', exercise.bag.totalSeries)
      setValue('totalRepetitions', exercise.bag.totalRepetitions)
      setValue('rest', exercise.bag.rest)
      setValue('weight', exercise.bag.weight)
    }
  }, [exercise, setValue])

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={'right'}>
      <DrawerOverlay />
      <DrawerContent bg={'brown.default'}>
        <DrawerCloseButton />

        <Flex alignItems={'center'} flexDirection={'column'}>
          <DrawerHeader>Configure the execution</DrawerHeader>
          <small>{exercise?.name}</small>
        </Flex>

        <DrawerBody as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={'column'} gap={5}>
            <InputForm
              type={'number'}
              pk={'totalSeries'}
              label={'Total series'}
              error={errors.totalSeries}
              {...register('totalSeries')}
            />

            <InputForm
              pk={'totalRepetitions'}
              label={'Repetitions'}
              {...register('totalRepetitions')}
            />

            <InputForm pk={'rest'} label={'Rest'} {...register('rest')} />

            <InputForm
              pk={'weight'}
              label={'Weight (Kg)'}
              {...register('weight')}
            />
          </Flex>
          <Flex marginTop={10} gap={2} flexDirection={'column'}>
            <Divider mb={5} />

            <Button
              width={'full'}
              disabled={isSubmitting}
              bg={'green.500'}
              type="submit"
              _hover={{
                opacity: 0.7,
              }}
            >
              Save
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
