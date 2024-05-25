import { HStack, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

import Header from '@/components/header.tsx'
import BarraLateral from '@/components/sidebar'
import { useAuth } from '@/context/AuthContext.tsx'
import { useUser } from '@/services/me-hook.ts'

export function AppLayout() {
  const location = useLocation()
  const { isAuthenticated, isExpired, logout } = useAuth()
  const { data, isError } = useUser()

  useEffect(() => {
    const checkTokenExpiration = setInterval(() => {
      if (isExpired()) {
        console.log('expired')
        toast.error('Sua sessão expirou, faça login novamente')
        logout()
      } else {
        console.log('not expired')
      }
    }, 5000)

    return () => clearInterval(checkTokenExpiration)
  }, [isExpired, logout])

  useEffect(() => {
    if (isError) {
      console.log('isError')
      logout()
      toast.error('Sua sessão expirou, faça login novamente')
    } else {
      console.log('no error')
    }
  }, [isError, data, logout])

  return isAuthenticated() || isExpired() ? (
    <HStack alignItems={'start'} flexDirection={'row'}>
      <BarraLateral />
      <Stack width={'100%'} py={'6'} spacing={6}>
        <span
          style={{
            display: 'none',
          }}
        >
          {data?.email}
        </span>

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
