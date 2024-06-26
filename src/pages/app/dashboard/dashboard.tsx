import { Container, Heading, Stack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { MonthRevenueUsersCard } from '@/pages/app/dashboard/month-revenue-users-card.tsx'
import { PopularTeamsChart } from '@/pages/app/dashboard/popular-teams-chart.tsx'
import { RevenueChart } from '@/pages/app/dashboard/revenue-chart.tsx'

export function Dashboard() {
  return (
    <>
      <Helmet title={'Dashboard'} />
      <Container maxW={['100%', null, null, '70%']} px={'6'}>
        <Stack spacing={'4'}>
          <Heading size="2xl" fontWeight="normal">
            Dashboard
          </Heading>
          <MonthRevenueUsersCard />
          <RevenueChart />
          <PopularTeamsChart />
        </Stack>
      </Container>
    </>
  )
}
