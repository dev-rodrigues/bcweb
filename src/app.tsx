import './global.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { AuthProvider } from '@/context/AuthContext.tsx'

import { ThemeProvider } from './components/theme/theme-provider.tsx'
import { router } from './routes.tsx'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
})

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="bc.team">
        <AuthProvider>
          <Helmet titleTemplate="%s | bc.team" />
          <Toaster richColors />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
