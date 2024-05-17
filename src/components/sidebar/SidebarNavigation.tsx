import { Button, Divider, Icon, Stack } from '@chakra-ui/react'
import { DumbbellIcon, Users } from 'lucide-react'
import { BiExit, BiMoney } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { RiDashboardLine } from 'react-icons/ri'

import { Section } from '@/components/sidebar/Section.tsx'

import { useAuth } from '../../context/AuthContext'
import { Item } from './Item'

export function SidebarNavigation() {
  const { logout, hasPermission } = useAuth()

  const canViewEditUsers = hasPermission(['ADMIN'])
  const canViewEditExercises = hasPermission(['ADMIN', 'TEAM_LEADER'])

  return (
    <>
      <Stack
        marginTop={{
          base: 8,
          lg: 10,
        }}
        marginLeft={{
          base: 0,
          lg: 8,
        }}
      >
        <Section title="GERAL">
          <Item icon={RiDashboardLine} href="/">
            Home
          </Item>
          {canViewEditUsers && (
            <Item icon={Users} href="/teams">
              Teams
            </Item>
          )}

          {canViewEditUsers && (
            <Item icon={Users} href="/users">
              Users
            </Item>
          )}

          {canViewEditExercises && (
            <Item icon={DumbbellIcon} href="/exercises">
              Exercises
            </Item>
          )}

          {canViewEditExercises && (
            <Item icon={FaUsers} href="/students">
              Students
            </Item>
          )}

          {canViewEditExercises && (
            <Item icon={BiMoney} href="/plans">
              Plans
            </Item>
          )}
        </Section>
      </Stack>

      <Divider my="6" borderColor="gray.700" />

      <Section>
        <Button
          color={'white'}
          onClick={logout}
          bg={'gray.500'}
          rightIcon={<Icon as={BiExit} size="20px" color={'white'} />}
        >
          Sair
        </Button>
      </Section>
    </>
  )
}
