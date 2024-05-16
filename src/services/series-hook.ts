import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type SelectedTabExercise = {
  tab: string
  exercises: string[]
}

export function useSeries() {
  const [selectedSerie, setSelectedSerie] = useState<string>('A')
  const [selectedTab, setSelectedTab] = useState<string>('A')

  const [series, setSeries] = useState<string[]>([])
  const [draft, setDraft] = useState<string[]>([])
  const [selectedExercises, setSelectedExercises] = useState<
    SelectedTabExercise[]
  >([])
  const [exercisesByTab, setExercisesByTab] = useState<string[]>([])

  useEffect(() => {
    const filteredExercises = selectedExercises.filter(
      (exercise) => exercise.tab === selectedTab,
    )

    const exercisesList = filteredExercises.flatMap(
      (exercise) => exercise.exercises,
    )

    setExercisesByTab(exercisesList)
  }, [selectedTab, selectedExercises])

  const addSeries = (newSeries: string) => {
    if (series[series.length - 1] === newSeries) {
      toast.error('Série já adicionada')
      return
    }
    setSeries((prevSeries) => [...prevSeries, newSeries])
  }

  const addDraft = (it: string): boolean => {
    if (series.length === 0) {
      toast.error('Adicione uma série')
      return false
    }

    setDraft([...draft, it])
    return true
  }

  const handleSeries = () => {
    if (draft.length === 0) {
      toast.error('Adicione um exercício')
      return
    }

    const newExercises = draft.map((d) => {
      const existingExercise = selectedExercises.find(
        (exercise) => exercise.tab === selectedSerie,
      )
      return {
        tab: selectedSerie,
        exercises: existingExercise ? [...existingExercise.exercises, d] : [d],
      }
    })

    setSelectedExercises([...selectedExercises, ...newExercises])
    setDraft([])
  }

  const handleTabSelected = (tab: string) => {
    setSelectedSerie(tab)
  }

  const handleChangeTab = (tab: string) => {
    setSelectedTab(tab)
  }

  return {
    series,
    addSeries,
    draft,
    addDraft,
    handleSeries,
    selectedSerie,
    handleTabSelected,
    exercisesByTab,
    handleChangeTab,
  }
}
