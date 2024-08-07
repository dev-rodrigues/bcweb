import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import { BarChart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card.tsx'
import { useTop5Teams } from '@/services/team-hook.ts'

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
]

type PopularTeamsChart = {
  team: string
  registered: number
}

export function PopularTeamsChart() {
  const { data: top } = useTop5Teams()
  const [popularTeams, setPopularTeams] = useState<PopularTeamsChart[]>([])

  useEffect(() => {
    top?.forEach((it) => {
      setPopularTeams((prev) => [
        ...prev,
        { team: it.customerName, registered: it.registered },
      ])
    })
  }, [top])

  return (
    <Card>
      <CardHeader
        alignItems={'center'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Heading size={'md'}>Most popular times</Heading>
        <BarChart className={'h-4 w-4 text-muted-foreground'} />
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={popularTeams}
              dataKey="registered"
              name={'team'}
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {popularTeams[index].team.length > 12
                      ? popularTeams[index].team.substring(0, 12).concat('...')
                      : popularTeams[index].team}{' '}
                    ({value})
                  </text>
                )
              }}
            >
              {popularTeams.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  className="stroke-background hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}
