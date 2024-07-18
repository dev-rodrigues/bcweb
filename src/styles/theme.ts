import { modalAnatomy, tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, extendTheme } from '@chakra-ui/react'

const modalHelpers = createMultiStyleConfigHelpers(modalAnatomy.keys)
const baseModalStyle = modalHelpers.definePartsStyle({
  overlay: {
    bg: 'rgba(0, 0, 0, 0.6)',
  },
  dialog: {
    borderRadius: 'md',
    bg: '#211F2D',
  },
})
const modalTheme = modalHelpers.defineMultiStyleConfig({
  baseStyle: baseModalStyle,
})

const tableHelpers = createMultiStyleConfigHelpers(tableAnatomy.keys)
const baseTableStyle = tableHelpers.definePartsStyle({
  tbody: {
    borderWidth: '0',
  },
  tr: {
    border: 'hidden',

    _hover: {
      transform: 'scale(1)',
      transaction: 'transform 0.3s',
      backgroundColor: 'rgba(0, 0, 0, 1)',
    },
  },
})
const tableTheme = tableHelpers.defineMultiStyleConfig({
  baseStyle: baseTableStyle,
})

export const theme = extendTheme({
  components: {
    Modal: modalTheme,
    Table: tableTheme,
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
