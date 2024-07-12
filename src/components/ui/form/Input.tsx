import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  pk: string
  label?: string
  error?: FieldError
  mask?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { mask, pk, error = undefined, label, ...rest }: InputProps,
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={pk}>{label}</FormLabel>}
      <ChakraInput
        mask={mask}
        id={pk}
        name={pk}
        focusBorderColor="blue.900"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900',
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const InputForm = forwardRef(InputBase)
