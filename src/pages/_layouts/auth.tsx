import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      minHeight="100vh"
      bg={'blue.900'}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bg={'blue.900'}
      >
        <Flex
          bg={'blue.900'}
          // p="8"
          borderRadius={8}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Outlet />
        </Flex>
      </Flex>

      <footer className="text-sm">
        Painel do parceiro &copy; bc.team - {new Date().getFullYear()}
      </footer>
    </Flex>
  )
}
