import { Users } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { useGrowth } from '@/services/growth-hook.ts'

export function MonthRevenueUsersCard() {
  const { data } = useGrowth()
  return (
    <Card className={'mb-4'}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Total teams</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-semibold tracking-tight">
          {data?.totalTimes}
        </span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">
            {`${data?.percentileChange}%`}
          </span>{' '}
          compared to last month
        </p>
      </CardContent>
    </Card>
  )
}
