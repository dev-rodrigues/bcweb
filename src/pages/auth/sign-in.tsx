import { Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

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

      toast.success('Welcome')
    } catch (error: unknown) {
      const re = error as AxiosError<GenericAppError>

      toast.error(re.response?.data?.message || 'Error when logging in')
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
          bg="#0F0F0F"
          p="8"
          boxShadow="0 4px 20px rgba(0, 0, 0, 1)"
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

          <Button
            bg={'#1A1C26'}
            color={'white'}
            disabled={isSubmitting}
            className="w-full"
            type="submit"
            _hover={{
              bg: '#2A2C36', // Altera a cor de fundo para uma mais clara ou mais escura
              transform: 'scale(1.05)', // Aumenta ligeiramente o tamanho do botão
            }}
          >
            Login
          </Button>

          <Flex justifyContent="center">
            <Text>
              Not a member yet?{' '}
              <Link
                to="/sign-up"
                style={{
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  color: 'inherit',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#CC1235')} // Muda a cor no hover
                onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')} // Retorna à cor original quando não está mais em hover
              >
                Register Now
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
