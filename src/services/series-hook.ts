import { useState } from 'react'
import { toast } from 'sonner'

export function useSeries() {
  const [series, setSeries] = useState<string[]>([])

  const addSeries = (newSeries: string) => {
    if (series[series.length - 1] === newSeries) {
      toast.error('Série já adicionada')
      return
    }
    setSeries((prevSeries) => [...prevSeries, newSeries])
  }

  return { series, addSeries }
}
