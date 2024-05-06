import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { MailIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { createTeam } from '@/api/sign-up.ts'
import { FormField } from '@/components/form.tsx'
import { PasswordInput } from '@/components/password-input.tsx'
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
import { GenericAppError } from '@/types/common.ts'
import { SignUpFormType } from '@/types/commons-signup.ts'

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignUpFormType>()

  const { mutate } = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      toast.success('Time cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })

      setTimeout(() => {
        navigate('/sign-in')
      }, 2000)
    },
    onError: (e: AxiosError<GenericAppError>) => {
      toast.error(e.response?.data.message)
    },
  })

  const onSubmit = (form: SignUpFormType) => {
    mutate(form)
  }

  return (
    <>
      <Helmet title={'Cadastro'} />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6"></div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criando conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e acompanhe seus alunos pelo painel
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="mt-12 space-y-2">
            <Label htmlFor="teamname">Nome do time</Label>
            <Input id="teamname" type="text" {...register('teamName')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" type="text" {...register('managerName')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerPassword">Sua senha</Label>
            <PasswordInput
              id="managerPassword"
              {...register('password')}
              useIcon={true}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <PhoneInput placeholder="Enter a phone number" {...field} />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              suffix={<MailIcon />}
            />
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
            Finalizar cadastro
          </Button>

          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você concorda com nossos{' '}
            <a className="underline underline-offset-4" href="">
              termos de serviço
            </a>{' '}
            e{' '}
            <a className="underline underline-offset-4" href="">
              política de privacidade
            </a>
          </p>
        </form>
      </div>
    </>
  )
}
