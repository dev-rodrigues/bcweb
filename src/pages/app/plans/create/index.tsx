import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaRegTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'
import { toast } from 'sonner'

import { createPlan } from '@/api/plans.ts'
import { queryClient } from '@/app.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
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

  const { control, register, handleSubmit, reset } = useForm<PlanFormType>({
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
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Flex justify="flex-end">
        <button type="button" onClick={onRequestClose}>
          <FaRegTimesCircle size={25} />
        </button>
      </Flex>

      <Box flex="1" borderRadius={8}>
        <Heading size="lg" fontWeight="normal">
          Create a plan
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8" as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Flex display={'flex'} direction={'column'} gap={2}>
            <Flex
              direction={{
                base: 'column',
                md: 'row',
              }}
              gap={{
                base: 2,
                md: 4,
              }}
            >
              <div>
                <Tooltip label={'Will appear in the banner header'}>
                  <Label htmlFor="type">Type</Label>
                </Tooltip>
                <Input id="type" type="text" {...register('type')} />
              </div>

              <div>
                <Tooltip label={'Price'}>
                  <Label htmlFor="price">Price (R$)</Label>
                </Tooltip>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      borderColor="gray.700"
                      onChange={(valueString) => field.onChange(valueString)}
                      _focus={{
                        borderColor: 'red',
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper></NumberInputStepper>
                    </NumberInput>
                  )}
                />
              </div>

              <div>
                <Tooltip label={'Offer'}>
                  <Label htmlFor="offer">Offer</Label>
                </Tooltip>

                <div className="flex items-center">
                  <Input
                    id="offer"
                    type="text"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                  />
                  <Tooltip label={'Add offer'}>
                    <Button
                      type={'button'}
                      className="ml-2"
                      onClick={onAddOffer}
                    >
                      +
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Flex>

            <Container>
              {/* <Divider borderColor="gray.700" /> */}

              <Table
                style={{
                  maxHeight: '100px',
                  overflowY: 'auto',
                }}
              >
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-full">Nome</TableHead>
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

              <Button type={'submit'}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Salvar
              </Button>
            </Container>
          </Flex>
        </VStack>
      </Box>
    </Modal>
  )
}
