import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react'

import { SidebarNavigation } from '@/components/sidebar/SidebarNavigation.tsx'

import { useBarraLateralNavegacao } from '../../context/BarraLateralNavegacaoContext'

export default function BarraLateral() {
  const { isOpen, onClose } = useBarraLateralNavegacao()

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" height={'100%'} padding="4">
            <DrawerCloseButton mt="6" />
            <DrawerBody>
              <SidebarNavigation />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box
      // bg="gray.800"
      as="aside"
      width={64}
      marginRight={8}
      display={'flex'}
      alignItems={'center'}
    >
      <SidebarNavigation />
    </Box>
  )
}
