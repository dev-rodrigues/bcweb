import { Container, Flex, Heading } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button.tsx'
import { InputForm } from '@/components/ui/form/Input.tsx'
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
    } catch (error: unknown) {
      const re = error as AxiosError<GenericAppError>

      toast.error(re.response?.data?.message || 'Erro ao fazer login')
    }
  }

  return (
    <>
      <Helmet title={'Login'} />
      <Container display="flex" alignItems="center" justifyContent="center">
        <Flex
          gap={3}
          as="form"
          width="100%"
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDirection="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Heading>Partner dashboard</Heading>

          <InputForm
            label={'E-mail'}
            pk={'email'}
            type={'email'}
            {...register('email')}
          />
          <InputForm
            label={'Password'}
            pk={'password'}
            type={'password'}
            {...register('password')}
          />

          <Button disabled={isSubmitting} className="w-full" type="submit">
            Login
          </Button>

          <Link to="/sign-up">
            <Button className="w-full" type="button" variant="secondary">
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Container>
    </>
  )
}
