import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/app.tsx'
import { AuthLayout } from '@/pages/_layouts/auth.tsx'
import { NotFound } from '@/pages/404.tsx'
import { Dashboard } from '@/pages/app/dashboard/dashboard.tsx'
import { ExerciseFile } from '@/pages/app/exercise-file'
import { Exercises } from '@/pages/app/exercises/exercises.tsx'
import { Plans } from '@/pages/app/plans'
import { Profile } from '@/pages/app/profile/profile.tsx'
import { Students } from '@/pages/app/students'
import { Teams } from '@/pages/app/teams/teams.tsx'
import { Training } from '@/pages/app/training'
import { Users } from '@/pages/app/users/users.tsx'
import { SignIn } from '@/pages/auth/sign-in.tsx'
import { SignUp } from '@/pages/auth/sign-up.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/teams', element: <Teams /> },
      { path: '/users', element: <Users /> },
      { path: '/exercises', element: <Exercises /> },
      { path: '/exercise-files/:exerciseId', element: <ExerciseFile /> },
      { path: '/profile', element: <Profile /> },
      { path: '/students', element: <Students /> },
      { path: '/training/:studentId', element: <Training /> },
      { path: '/plans', element: <Plans /> },
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
