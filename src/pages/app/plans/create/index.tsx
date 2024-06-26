import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Loader2, PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'
import { toast } from 'sonner'

import { createPlan } from '@/api/plans.ts'
import { queryClient } from '@/app.tsx'
import { InputForm } from '@/components/ui/form/Input.tsx'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { PlanCreateRow } from '@/pages/app/plans/create/plan-create-row.tsx'
import { GenericAppError } from '@/types/common.ts'
import { createPlanForm, PlanFormType } from '@/types/common-plan.ts'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export function CreatePlan({ isOpen, onRequestClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [offer, setOffer] = useState('')
  const [offers, setOffers] = useState<string[]>([])

  const { register, handleSubmit, reset } = useForm<PlanFormType>({
    resolver: zodResolver(createPlanForm),
  })

  const { mutate } = useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['plans'],
        })
        .catch(() => {
          toast.error('An error occurred')
        })
        .finally(() => {
          setIsSubmitting(false)
          onRequestClose()
          toast.success('Plan created successfully')
        })
    },
    onError: (error: AxiosError<GenericAppError>) => {
      setIsSubmitting(false)
      reset()
      toast.error(error.response?.data.message || 'An error occurred')
    },
  })

  const onSubmit = (form: PlanFormType) => {
    const modifiedForm = { ...form, offers }

    setIsSubmitting(true)
    mutate(modifiedForm)
  }

  const onAddOffer = () => {
    if (offer.trimEnd() !== '') {
      setOffers((prevOffers) => [...prevOffers, offer])
      setOffer('')
      toast.success('Offer added')
    } else {
      toast.error('Offer cannot be empty')
    }
  }

  function onRemoveOffer(index: number) {
    setOffers((prevOffers) => prevOffers.filter((_, i) => i !== index))
  }

  useEffect(() => {
    if (isOpen) {
      reset()
      setOffers([])
    }
  }, [isOpen, reset])

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Box flex="1" borderRadius={8} overflow="auto">
        <Flex justify="flex-end">
          <Button type="button" onClick={onRequestClose}>
            <FaRegTimesCircle size={25} />
          </Button>
        </Flex>
        <Heading size="lg" p={8} fontWeight="normal">
          Create a plan
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack p={8} spacing="8" as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            label={'Type'}
            pk={'type'}
            type={'text'}
            {...register('type')}
          />

          <InputForm
            label={'Price'}
            pk={'price'}
            type={'text'}
            {...register('price')}
          />

          <HStack width={'100%'} alignItems={'center'} alignContent={'center'}>
            <InputForm
              label={'Offer'}
              pk={'offer'}
              onChange={(e) => setOffer(e.target.value)}
            />
            <Tooltip label={'Add Offer'}>
              <Button type={'button'} onClick={onAddOffer} mt={10}>
                <PlusIcon />
              </Button>
            </Tooltip>
          </HStack>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full">Offers</TableHead>
                <TableHead className="w-auto"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers?.map((it, i) => {
                return (
                  <PlanCreateRow
                    key={i}
                    label={it}
                    handleDelete={() => onRemoveOffer(i)}
                  />
                )
              })}
            </TableBody>
          </Table>

          <Flex justify="flex-start">
            <Button type={'submit'} bg={'red.default'}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Salvar
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Modal>
  )
}
