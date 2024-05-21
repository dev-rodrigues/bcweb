import { Flex, Spacer } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <Flex
      width="100vw"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      {/* Header */}

      <Flex
        width="100%"
        maxWidth={512}
        height="100%"
        p="8"
        borderRadius={8}
        flexDirection="column"
      >
        <Outlet />
      </Flex>

      <Spacer />

      <footer className="p-4 text-sm">
        Painel do parceiro &copy; bc.team - {new Date().getFullYear()}
      </footer>
    </Flex>
  )
}
