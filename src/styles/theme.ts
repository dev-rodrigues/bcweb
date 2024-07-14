import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { extendTheme } from '@chakra-ui/react'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  overlay: {
    bg: 'rgba(0, 0, 0, 0.6)',
  },
  dialog: {
    borderRadius: 'md',
    bg: `#211F2D`,
  },
})

const modalTheme = defineMultiStyleConfig({
  baseStyle,
})

export const theme = extendTheme({
  components: {
    Modal: modalTheme,
  },
  colors: {
    red: {
      default: '#E11D47',
    },
    brown: {
      default: '#333333',
    },
    blue: {
      '900': '#02020F',
    },
    gray: {
      wip: '#202232',
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
        bg: '#02020F',
        color: 'gray.100',
      },
    },
  },
})
