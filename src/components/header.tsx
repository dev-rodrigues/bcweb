import { Separator } from '@radix-ui/react-separator'
import { DumbbellIcon, Home, Users } from 'lucide-react'
import { FaUsers } from 'react-icons/fa'

import { AccountMenu } from '@/components/account-menu.tsx'
import { NavLink } from '@/components/nav-link.tsx'
import { ThemeToggle } from '@/components/theme/theme-toggle.tsx'
import { useAuth } from '@/context/AuthContext.tsx'

export function Header() {
  const { hasPermission } = useAuth()

  const canViewEditUsers = hasPermission(['ADMIN'])
  const canViewEditExercises = hasPermission(['ADMIN', 'TEAM_LEADER'])

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        BC.team
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className={'h-4 w-4'} />
            Home
          </NavLink>

          {canViewEditUsers && (
            <NavLink to="/teams">
              <Users className={'h-4 w-4'} />
              Teams
            </NavLink>
          )}

          {canViewEditUsers && (
            <NavLink to="/users">
              <Users className={'h-4 w-4'} />
              Users
            </NavLink>
          )}

          {canViewEditExercises && (
            <NavLink to="/exercises">
              <DumbbellIcon className={'h-4 w-4'} />
              Exercises
            </NavLink>
          )}

          {canViewEditExercises && (
            <NavLink to="/students">
              <FaUsers className={'h-4 w-4'} />
              Students
            </NavLink>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
