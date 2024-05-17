import {
  Flex,
  Icon,
  IconButton,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'

import { AccountMenu } from '@/components/account-menu.tsx'
import { useBarraLateralNavegacao } from '@/context/BarraLateralNavegacaoContext.tsx'

export default function Header() {
  const { onOpen } = useBarraLateralNavegacao()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex as="header" marginLeft={5} justifyContent={'space-between'}>
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
      <AccountMenu />
    </Flex>
  )
}
