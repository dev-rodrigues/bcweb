import { Container, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { MonthRevenueUsersCard } from '@/pages/app/dashboard/month-revenue-users-card.tsx'
import { PopularTeamsChart } from '@/pages/app/dashboard/popular-teams-chart.tsx'

export function Dashboard() {
  return (
    <>
      <Helmet title={'Dashboard'} />
      <Container maxW={['100%', null, null, '70%']} px={'6'}>
        <Stack spacing={'4'}>
          <Heading size="lg" fontWeight="normal">
            Dashboard
          </Heading>

          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          >
            <MonthRevenueUsersCard />
            <PopularTeamsChart />
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}
