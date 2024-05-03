import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createTeam } from '@/api/sign-up.ts'
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
import { SignUpFormType } from '@/types/commons-signup.ts'

export function Profile() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignUpFormType>()

  const { mutate } = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      toast.success('Time cadastrado com sucesso!', {})
    },
    onError: () => {
      toast.error('Erro ao cadastrar time')
    },
  })

  const onSubmit = (form: SignUpFormType) => {
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
              Mantenha seus dados atualizados
            </p>
          </div>
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
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerPassword">Sua senha</Label>
              <Input
                id="managerPassword"
                type="password"
                {...register('password')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Serviço</Label>

              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent id="service">
                      <SelectItem value="1">Ed. Fisíca</SelectItem>
                      <SelectItem value="2">Nutrição</SelectItem>
                      <SelectItem value="3">Endocrinologia</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Editar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
