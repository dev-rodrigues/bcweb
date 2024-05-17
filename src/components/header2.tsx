import {
  Flex,
  Icon,
  IconButton,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'

import { useBarraLateralNavegacao } from '@/context/BarraLateralNavegacaoContext.tsx'

export default function Header2() {
  const { onOpen } = useBarraLateralNavegacao()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      width="100%"
      maxWidth={1480}
      marginX="auto"
      // paddingX="6"
      // align="center"
    >
      {!isWideVersion && (
        <Tooltip label={'Menu'}>
          <IconButton
            aria-label="Abrir menu"
            icon={<Icon as={RiMenuLine} />}
            fontSize="24"
            variant="unstyled"
            onClick={onOpen}
          />
        </Tooltip>
      )}
    </Flex>
  )
}
