import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        width="100%"
        maxWidth={400}
        p="8"
        borderRadius={8}
        flexDirection="column"
      >
        <Outlet />
      </Flex>
    </Flex>
  )
}
