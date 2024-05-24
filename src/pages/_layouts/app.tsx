import { HStack, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

import Header from '@/components/header.tsx'
import BarraLateral from '@/components/sidebar'
import { useAuth } from '@/context/AuthContext.tsx'

export function AppLayout() {
  const location = useLocation()
  const { isAuthenticated, isExpired, logout } = useAuth()

  useEffect(() => {
    const checkTokenExpiration = setInterval(() => {
      if (isExpired()) {
        console.log('expired')
        toast.error('Sua sessão expirou, faça login novamente')
        logout()
      }
    }, 5000)

    return () => clearInterval(checkTokenExpiration)
  }, [isExpired, logout])

  return isAuthenticated() || isExpired() ? (
    <HStack alignItems={'start'} flexDirection={'row'}>
      <BarraLateral />
      <Stack width={'100%'} py={'6'} spacing={6}>
        <Header />

        <Outlet />
      </Stack>
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
