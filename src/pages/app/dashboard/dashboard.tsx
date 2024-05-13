import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'

import { DeviceContext } from '@/context/DeviceContext.tsx'
import { MonthRevenueUsersCard } from '@/pages/app/dashboard/month-revenue-users-card.tsx'
import { PopularTeamsChart } from '@/pages/app/dashboard/popular-teams-chart.tsx'
import { RevenueChart } from '@/pages/app/dashboard/revenue-chart.tsx'

export function Dashboard() {
  const isMobile = useContext(DeviceContext)

  return (
    <>
      <Helmet title={'Dashboard'} />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className={'grid grid-cols-4 gap-4'}>
          {!isMobile && <MonthRevenueUsersCard />}
        </div>
        <div className="grid grid-cols-9 gap-4">
          {!isMobile && (
            <>
              <RevenueChart />
              <PopularTeamsChart />
            </>
          )}
        </div>
      </div>
    </>
  )
}
