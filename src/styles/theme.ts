import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#0D0A0A',
        color: 'gray.100',
      },
      '*': {
        borderColor: '#1B1917',
      },
    },
  },
})
