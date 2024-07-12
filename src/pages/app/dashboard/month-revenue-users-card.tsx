import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from '@chakra-ui/react'
import { Users } from 'lucide-react'

import { useGrowth } from '@/services/growth-hook.ts'

export function MonthRevenueUsersCard() {
  const { data } = useGrowth()
  return (
    <Card>
      <CardHeader
        alignItems={'center'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Heading size={'md'}>Total teams</Heading>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardBody textAlign={'center'}>
        <Heading size={'4xl'} color={'red.default'} fontWeight={'900'}>
          {data?.totalTimes}
        </Heading>
      </CardBody>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">
            {`${data?.percentileChange}%`}
          </span>{' '}
          compared to last month
        </p>
      </CardFooter>
    </Card>
  )
}
