import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    red: {
      default: '#E11D47',
    },
    gray: {
      '900': '#181b23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
      default: '#27272A',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#13121D',
        color: 'gray.50',
      },
    },
  },
})
