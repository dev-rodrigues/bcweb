import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { InputForm } from '@/components/ui/form/Input.tsx'
import { SearchExerciseResponse } from '@/pages/app/training/tabs/TabBuildTryingSearchExercises.tsx'

type Props = {
  isOpen: boolean
  onClose: () => void
  exercise: SearchExerciseResponse | null
}

type ConfigureTrainingForm = {
  totalSeries: number
  totalRepetitions: number
  rest: number
  weight: number
}

export function ConfigureTraining({ exercise, isOpen, onClose }: Props) {
  const { register } = useForm<ConfigureTrainingForm>()

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={'right'}>
      <DrawerOverlay />
      <DrawerContent bg={'brown.default'}>
        <DrawerCloseButton />
        <DrawerHeader>Configure the execution</DrawerHeader>

        <DrawerBody>
          <Flex direction={'column'} gap={5} as={'form'}>
            <InputForm
              type={'number'}
              pk={'totalSeries'}
              label={'Total series'}
              {...register('totalSeries')}
            />

            <InputForm
              type={'number'}
              pk={'totalSeries'}
              label={'Repetitions'}
              {...register('totalSeries')}
            />

            <InputForm
              type={'number'}
              pk={'totalSeries'}
              label={'Rest'}
              {...register('totalSeries')}
            />

            <InputForm
              type={'number'}
              pk={'totalSeries'}
              label={'Weight'}
              {...register('totalSeries')}
            />
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button bg={'red.default'} mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button rightIcon={<SaveIcon />} bg={'green.500'}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
