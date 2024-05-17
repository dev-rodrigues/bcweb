import { Container, Heading } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { MonthRevenueUsersCard } from '@/pages/app/dashboard/month-revenue-users-card.tsx'
import { PopularTeamsChart } from '@/pages/app/dashboard/popular-teams-chart.tsx'
import { RevenueChart } from '@/pages/app/dashboard/revenue-chart.tsx'

export function Dashboard() {
  return (
    <>
      <Helmet title={'Dashboard'} />
      <Container display={'flex'} flexDirection={'column'}>
        <Container>
          <Heading size="2xl" fontWeight="normal">
            Dashboard
          </Heading>
          <MonthRevenueUsersCard />
          <RevenueChart />
          <PopularTeamsChart />
        </Container>
      </Container>
    </>
  )
}
