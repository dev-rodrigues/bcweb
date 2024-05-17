import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
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
      height="20"
      maxWidth={1480}
      marginX="auto"
      paddingX="6"
      marginTop="4"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Abrir menu"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}
    </Flex>
  )
}
