import { Separator } from '@radix-ui/react-separator'
import { ClipboardList, Home, Users } from 'lucide-react'

import { NavLink } from '@/components/nav-link.tsx'

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

          <NavLink to="/sign-up">
            <Users className={'h-4 w-4'} />
            Alunos
          </NavLink>
        </nav>
      </div>
    </div>
  )
}
