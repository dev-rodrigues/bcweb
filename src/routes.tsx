import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/app.tsx'
import { AuthLayout } from '@/pages/_layouts/auth.tsx'
import { Dashboard } from '@/pages/app/dashboard/dashboard.tsx'
import { Teams } from '@/pages/app/teams/teams.tsx'
import { SignIn } from '@/pages/auth/sign-in.tsx'
import { SignUp } from '@/pages/auth/sign-up.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/teams', element: <Teams /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
])
