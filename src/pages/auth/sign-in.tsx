import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { MailIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { PasswordInput } from '@/components/password-input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { useAuth } from '@/context/AuthContext.tsx'
import { GenericAppError } from '@/types/common.ts'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignInFormType = z.infer<typeof signInForm>

export function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInForm),
  })

  async function handleSignIn(data: SignInFormType) {
    try {
      await login({
        login: data.email,
        password: data.password,
      })

      navigate('/')

      toast.success('Seja Bem-vindo')
    } catch (error: any) {
      const re = error as AxiosError<GenericAppError>

      toast.error(re.response?.data.message || 'Erro ao fazer login')
    }
  }

  return (
    <>
      <Helmet title={'Login'} />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Cadastre-se</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6"></div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe seus alunos pelo painel do parceiro
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex flex-col gap-4"
        >
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
            <Label htmlFor="email">Sua senha</Label>
            <PasswordInput id="password" {...register('password')} useIcon />
          </div>
          <Button disabled={isSubmitting} className="w-full" type="submit">
            Acessar painel
          </Button>
        </form>
      </div>
    </>
  )
}
