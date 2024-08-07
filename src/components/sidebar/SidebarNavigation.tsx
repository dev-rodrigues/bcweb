import { Button, Divider, Heading, Icon, Stack, Text } from '@chakra-ui/react'
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
      <Stack height={'100vh'} alignItems={'center'} paddingLeft={10}>
        <Heading
          mt={10}
          size={'xl'}
          fontStyle="italic"
          color={'white'}
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.25)"
        >
          BC
          <Text as="span" color="red">
            .
          </Text>
          <Text
            as="span"
            style={{
              display: 'inline-block',
            }}
          >
            Team
          </Text>
        </Heading>

        <Section title="GERAL" mt={10}>
          <Item icon={RiDashboardLine} href="/">
            Home
          </Item>

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

        <Section title={'ADMIN'} mt={5}>
          {canViewEditUsers && (
            <Item icon={Users} href="/teams">
              Teams
            </Item>
          )}

          {canViewEditExercises && (
            <Item icon={DumbbellIcon} href="/exercises">
              Exercises
            </Item>
          )}

          {canViewEditUsers && (
            <Item icon={Users} href="/users">
              Users
            </Item>
          )}
        </Section>

        <Divider my="6" borderColor="gray.700" />

        <Section>
          <Button
            size={'lg'}
            color={'white'}
            onClick={logout}
            bg={'#E11D48'}
            rightIcon={<Icon as={BiExit} size="20px" color={'white'} />}
          >
            Logout
          </Button>
        </Section>
      </Stack>
    </>
  )
}
