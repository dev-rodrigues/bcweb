import { Container, HStack } from '@chakra-ui/react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import Header2 from '@/components/header2.tsx'
import BarraLateral from '@/components/sidebar'
import { useAuth } from '@/context/AuthContext.tsx'

export function AppLayout() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  return isAuthenticated() ? (
    <HStack padding={10} alignItems={'start'}>
      <BarraLateral />
      <Container
        flex={1}
        display={'flex'}
        flexDirection={'column'}
        gap={4}
        padding={8}
        pt={6}
      >
        <Header2 />
        <Outlet />
      </Container>
    </HStack>
  ) : (
    // <div className="flex min-h-screen flex-col antialiased">
    //   {/* <Header /> */}
    //   <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
    //     <Outlet />
    //   </div>
    // </div>
    <Navigate
      to={'/sign-in'}
      replace
      state={{
        from: location,
      }}
    />
  )
}
