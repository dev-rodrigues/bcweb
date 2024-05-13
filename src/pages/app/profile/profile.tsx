import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { updateProfile } from '@/api/sign-up.ts'
import { FormField } from '@/components/form.tsx'
import Loading from '@/components/loading.tsx'
import { PhoneInput } from '@/components/phone-input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { useUser } from '@/services/me-hook.ts'
import { ContentUserSchemaType } from '@/types/common-user.ts'

export function Profile() {
  const { data: user, isFetching } = useUser()

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, isLoading },
  } = useForm<ContentUserSchemaType>({
    defaultValues: {
      teamName: user?.teamName,
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
      service: user?.service,
    },
  })

  useEffect(() => {
    if (!isLoading || !isFetching) {
      reset({
        teamName: user?.teamName,
        name: user?.name,
        phone: user?.phone,
        email: user?.email,
        service: user?.service,
      })
    }
  }, [isFetching, isLoading, reset, user])

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success('Dados atualizados', {})
    },
    onError: () => {
      toast.error('Ocorreu um erro ao atualizar os dados')
    },
  })

  const onSubmit = (form: ContentUserSchemaType) => {
    mutate(form)
  }

  return (
    <>
      <Helmet title={'Perfil'} />
      <div className="p-8">
        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Edite seu perfil
            </h1>
            <p className="text-sm text-muted-foreground">
              Mantenha sempre seus dados atualizados
            </p>
          </div>
          {isLoading || isFetching ? (
            <Loading />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="mt-12 space-y-2">
                <Label htmlFor="teamname">Nome do time</Label>
                <Input id="teamname" type="text" {...register('teamName')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="managerName">Seu nome</Label>
                <Input id="managerName" type="text" {...register('name')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Enter a phone number"
                      {...field}
                      disabled
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Serviço</Label>
                <Controller
                  name="service"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent id="service" defaultValue={field.value}>
                        <SelectItem value="1">Ed. Fisíca</SelectItem>
                        <SelectItem value="2">Nutrição</SelectItem>
                        <SelectItem value="3">Endocrinologia</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <Button disabled={isSubmitting} className="w-full" type="submit">
                Atualizar
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
