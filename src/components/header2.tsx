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

export default function Header2() {
  const { onOpen } = useBarraLateralNavegacao()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex as="header" maxWidth={1480} marginLeft={5}>
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
      <div className="ml-auto flex items-center gap-2">
        <AccountMenu />
      </div>
    </Flex>
  )
}
