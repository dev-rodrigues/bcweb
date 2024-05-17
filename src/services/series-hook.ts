import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Tab = {
  index: number
  name: string
}

type SelectedTabExercise = {
  tab: Tab
  exercises: string[]
}

export function useSeries() {
  const [state, setState] = useState({
    selectedSerie: {
      index: 0,
      name: 'A',
    } as Tab,
    series: [] as string[],
    draft: [] as string[],
    exercisesByTab: [] as string[],
    selectedExercises: [] as SelectedTabExercise[],
  })

  useEffect(() => {
    const filteredExercises = state.selectedExercises.filter(
      (exercise) => exercise.tab === state.selectedSerie,
    )

    const exercisesList = filteredExercises.flatMap(
      (exercise) => exercise.exercises,
    )

    setState((prevState) => ({ ...prevState, exercisesByTab: exercisesList }))
  }, [state.selectedSerie, state.selectedExercises])

  const addSeries = (newSeries: string) => {
    if (state.series[state.series.length - 1] === newSeries) {
      toast.error('Série já adicionada')
      return
    }
    setState((prevState) => ({
      ...prevState,
      series: [...prevState.series, newSeries],
    }))
  }

  const addDraft = (it: string): boolean => {
    if (state.series.length === 0) {
      toast.error('Adicione uma série')
      return false
    }

    setState((prevState) => ({
      ...prevState,
      draft: [...prevState.draft, it],
    }))
    return true
  }

  const handleSeries = () => {
    if (state.draft.length === 0) {
      toast.error('Adicione um exercício')
      return
    }

    const newExercises = state.draft.map((d) => {
      const existingExercise = state.selectedExercises.find(
        (exercise) => exercise.tab === state.selectedSerie,
      )
      return {
        tab: state.selectedSerie,
        exercises: existingExercise ? [...existingExercise.exercises, d] : [d],
      }
    })

    setState((prevState) => ({
      ...prevState,
      selectedExercises: [...prevState.selectedExercises, ...newExercises],
      draft: [],
    }))
  }

  const handleTabSelected = (tab: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedSerie: {
        index: prevState.selectedSerie.index + 1,
        name: tab,
      } as Tab,
    }))
  }

  return {
    ...state,
    addSeries,
    addDraft,
    handleSeries,
    handleTabSelected,
  }
}
