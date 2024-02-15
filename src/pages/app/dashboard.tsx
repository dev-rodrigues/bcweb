import { Helmet } from 'react-helmet-async'

import { MonthRevenueUsersCard } from '@/pages/app/dashboard/month-revenue-users-card.tsx'

export function Dashboard() {
  return (
    <>
      <Helmet title={'Dashboard'} />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className={'grid grid-cols-4 gap-4'}>
          <MonthRevenueUsersCard />
        </div>
      </div>
    </>
  )
}
