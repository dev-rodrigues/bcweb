import {
  Button,
  Divider,
  Flex,
  Heading,
  Link as LinkUi,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { createTeam } from '@/api/sign-up.ts'
import { FormField } from '@/components/form.tsx'
import { InputForm } from '@/components/ui/form/Input.tsx'
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
      <Flex
        as="form"
        bg="gray.800"
        p="10"
        gap={4}
        borderRadius={8}
        onSubmit={handleSubmit(onSubmit)}
        flexDirection="column"
      >
        <VStack mb={'20px'}>
          <Heading textAlign={'center'}>Create your account</Heading>
          <Heading
            size={{
              md: 'md',
              base: 'xm',
            }}
            textAlign={'center'}
          >
            Partner with us and track your students on the dashboard
          </Heading>
        </VStack>

        <Divider color={'ping.500'} />

        <InputForm
          label={'Team Name'}
          pk={'teamName'}
          type={'text'}
          {...register('teamName')}
        />

        <InputForm
          label={'Name'}
          pk={'managerName'}
          type={'text'}
          {...register('managerName')}
        />

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

        <div>
          <Label htmlFor="phone">Telefone</Label>
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <InputForm
                pk={'phone'}
                placeholder="Enter a phone number"
                {...field}
              />
            )}
          />
        </div>

        <div>
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
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          bg={'red.default'}
          color={'white'}
        >
          Sign Up
        </Button>

        <Link to="/sign-in">
          <Button
            color={'white'}
            width={'full'}
            bg={'gray.default'}
            _hover={{
              opacity: 0.8,
            }}
          >
            Login
          </Button>
        </Link>

        <Text
          px={6}
          textAlign="center"
          fontSize="sm"
          lineHeight="relaxed"
          color="gray.500"
        >
          By continuing, you agree to our{' '}
          <LinkUi
            isExternal
            textDecoration="underline"
            href="/terms-of-service"
          >
            terms of service
          </LinkUi>{' '}
          and{' '}
          <LinkUi isExternal textDecoration="underline" href="/privacy-policy">
            privacy policy
          </LinkUi>
        </Text>
      </Flex>
    </>
  )
}
