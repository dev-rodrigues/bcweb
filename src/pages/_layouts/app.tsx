import { Container, HStack } from '@chakra-ui/react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import Header from '@/components/header.tsx'
import BarraLateral from '@/components/sidebar'
import { useAuth } from '@/context/AuthContext.tsx'

export function AppLayout() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  return isAuthenticated() ? (
    <HStack alignItems={'start'} flexDirection={'row'}>
      <BarraLateral />
      <Container display={'flex'} flexDirection={'column'} pt={6} pb={6}>
        <Header />
        <Outlet />
      </Container>
    </HStack>
  ) : (
    <Navigate
      to={'/sign-in'}
      replace
      state={{
        from: location,
      }}
    />
  )
}
