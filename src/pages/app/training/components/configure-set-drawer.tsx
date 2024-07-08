import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { Label } from '@/components/ui/label.tsx'
import { SelectedExercise } from '@/pages/app/training/modals/add-exercise-phasing-modal.tsx'
import { SearchExerciseFormType } from '@/types/common-exercise.ts'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
  selected: SelectedExercise
}

export function ConfigureSetDrawer({
  isOpen,
  onRequestClose,
  selected,
}: Props) {
  const { register } = useForm<SearchExerciseFormType>()

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onRequestClose}>
      <DrawerContent backgroundColor={'gray.700'}>
        <DrawerCloseButton color={'gray.500'} />

        <DrawerBody marginTop={10}>
          <Heading
            color={'purple.400'}
            fontSize={20}
            marginBottom={5}
            textAlign={'center'}
          >
            {selected.exercise.name}
          </Heading>

          <VStack>
            <div>
              <Label htmlFor="type">Technique:</Label>
              <Input id="type" type="text" {...register('name')} />
            </div>

            <div>
              <Label htmlFor="type">Repetitions:</Label>
              <Input id="type" type="text" {...register('name')} />
            </div>

            <div>
              <Label htmlFor="type">Suggested load :</Label>
              <Input id="type" type="text" {...register('name')} />
            </div>

            <div>
              <Label htmlFor="type">Suggested weight:</Label>
              <Input id="type" type="text" {...register('name')} />
            </div>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onRequestClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
