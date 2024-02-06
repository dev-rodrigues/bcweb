import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes.tsx'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | bc.team" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
