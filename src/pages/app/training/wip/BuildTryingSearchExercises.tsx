import { Button, Flex, Icon } from '@chakra-ui/react'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { InputForm } from '@/components/ui/form/Input.tsx'
import { api } from '@/lib/axios.ts'
import { TabSelectExerciseTable } from '@/pages/app/training/components/tab-select-exercise-table.tsx'
import { PageableSchemaType } from '@/types/common.ts'

interface SearchSelectExercise {
  value: string
}

export interface SearchExerciseResponse {
  id: number
  name: string
}

export interface SearchExercisePagedResponse {
  total: number
  content: SearchExerciseResponse[]
  pageNumber: number
  pageable: PageableSchemaType
}

type Props = {
  handleSelectExercise: (exercise: SearchExerciseResponse) => void
}

export function BuildTryingSearchExercises({ handleSelectExercise }: Props) {
  const size = 5
  const [page, setPage] = useState(0)

  const { register, handleSubmit, getValues } = useForm<SearchSelectExercise>()

  const [exercises, setExercises] = useState<
    SearchExercisePagedResponse | undefined
  >(undefined)
  const [fetchingExercise, setFetchingExercise] = useState(false)

  const onSubmit = async (form: SearchSelectExercise) => {
    try {
      setFetchingExercise(true)
      setPage(0)
      const response = await callApi(page, form.value)

      if (response.data.content.length > 0) {
        setExercises(response.data)
      } else {
        setExercises(undefined)
      }
    } catch (error) {
      toast.error('Error fetching exercises')
    } finally {
      setFetchingExercise(false)
    }
  }

  async function callApi(selectedPage: number, parameter?: string) {
    let url = `/exercises/search/page/${selectedPage}/size/${size}`
    if (parameter && parameter.trim() !== '') {
      url += `?name=${parameter}`
    } else {
      url += '?name'
    }
    return await api.get<SearchExercisePagedResponse>(url)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingExercise(true)

        const inputSearch = getValues('value')

        const response = await callApi(page, inputSearch)

        if (response.data.content.length > 0) {
          setExercises(response.data)
        } else {
          toast.info('No exercises found')
        }
      } catch (error) {
        toast.error('Error fetching exercises')
      } finally {
        setFetchingExercise(false)
      }
    }

    fetchData()
  }, [page])

  return (
    <Flex dir={'row'}>
      <Flex
        w={'50%'}
        flex={1}
        mr={10}
        as="form"
        flexDirection="row"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForm
          label={'Exercise'}
          pk={'type'}
          id="type"
          type="text"
          mr={2}
          style={{
            width: '400px',
          }}
          {...register('value')}
        />

        <Button mt={9} type={'submit'}>
          <Icon as={SearchIcon} />
        </Button>
      </Flex>
      <Flex w={'50%'} flex={1} mr={10} as="form" flexDirection="row">
        <TabSelectExerciseTable
          setPage={setPage}
          data={exercises}
          size={size}
          page={page}
          isFetching={fetchingExercise}
          handleAddExercise={handleSelectExercise}
        />
      </Flex>
    </Flex>
  )
}
