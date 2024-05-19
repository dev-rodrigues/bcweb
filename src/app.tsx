import './global.css'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { AuthProvider } from '@/context/AuthContext.tsx'
import { BarraLateralNavegacaoProvider } from '@/context/BarraLateralNavegacaoContext.tsx'
import { DeviceProvider } from '@/context/DeviceContext.tsx'
import { GlobalStyle } from '@/styles/global.ts'
import { theme } from '@/styles/theme.ts'

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
      <DeviceProvider>
        <ThemeProvider defaultTheme="dark" storageKey="bc.team">
          <ChakraProvider theme={theme}>
            <AuthProvider>
              <BarraLateralNavegacaoProvider>
                <Helmet titleTemplate="%s | bc.team" />
                <Toaster richColors />
                <QueryClientProvider client={queryClient}>
                  <RouterProvider router={router} />
                </QueryClientProvider>
              </BarraLateralNavegacaoProvider>
            </AuthProvider>
          </ChakraProvider>
          <GlobalStyle />
        </ThemeProvider>
      </DeviceProvider>
    </HelmetProvider>
  )
}
