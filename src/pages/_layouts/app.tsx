import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { Header } from '@/components/header.tsx'
import { useAuth } from '@/context/AuthContext.tsx'

export function AppLayout() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  return isAuthenticated() ? (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
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
