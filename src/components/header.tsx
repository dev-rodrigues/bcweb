import { Separator } from '@radix-ui/react-separator'
import { ClipboardList, Home, Users } from 'lucide-react'

import { AccountMenu } from '@/components/account-menu.tsx'
import { NavLink } from '@/components/nav-link.tsx'
import { ThemeToggle } from '@/components/theme/theme-toggle.tsx'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <ClipboardList className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className={'h-4 w-4'} />
            Início
          </NavLink>

          <NavLink to="/teams">
            <Users className={'h-4 w-4'} />
            Teams
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
