import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

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

const SignUpForm = z.object({
  teamName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  service: z.string(),
})

type SignUpFormType = z.infer<typeof SignUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignUpFormType>()

  async function handleSignUp(data: SignUpFormType) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast.success('Restaurante cadastrado com sucesso!', {
      action: {
        label: 'Login',
        onClick: () => navigate('/sign-in'),
      },
    })
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
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex flex-col gap-4"
        >
          <div className="mt-12 space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" type="text" {...register('managerName')} />
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
