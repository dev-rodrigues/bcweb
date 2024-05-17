import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { Label } from '@radix-ui/react-label'
import { ArrowBigDownDash, ArrowLeft, Plus } from 'lucide-react'
import { useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { useSeries } from '@/services/series-hook.ts'

type Filter = {
  name: string
  selected: boolean
}

export function Training() {
  const {
    series,
    addSeries,
    addDraft,
    exercisesByTab,
    handleSeries,
    selectedSerie,
    handleTabSelected,
  } = useSeries()

  const [exercises, setExercises] = useState<Filter[]>([
    { name: 'teste 1', selected: false },
    { name: 'teste 2', selected: false },
    { name: 'teste 3', selected: false },
  ])

  function goBack() {
    if (series.length === 0) {
      history.back()
    } else {
      toast.error('Em desenvolvimento')
    }
  }

  return (
    <Flex direction="column" h="100vh">
      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="#0E0A0A" p="8">
          <Heading size="lg" fontWeight="normal" mb={10}>
            <HStack>
              <Button
                gap={1}
                bgColor={'gray.300'}
                onClick={goBack}
                _hover={{
                  opacity: 0.8,
                }}
              >
                <ArrowLeft />
                Return
              </Button>
              <Button
                bg={'#E11D48'}
                _hover={{
                  opacity: 0.8,
                }}
              >
                Save
              </Button>
            </HStack>
          </Heading>

          <Divider my="6" borderColor="#353646" />

          <>
            <Label id={'serie'}>Série</Label>
            <HStack mb={10}>
              <Select
                width={'100px'}
                onChange={(e) => {
                  handleTabSelected(e.target.value)
                }}
                icon={<MdArrowDropDown />}
                id={'serie'}
                size="sm"
                borderColor="pink.500"
                _hover={{
                  borderColor: 'pink.500',
                }}
              >
                <option style={{ background: '#353646' }} value="A">
                  A
                </option>
                <option style={{ background: '#353646' }} value="B">
                  B
                </option>
                <option style={{ background: '#353646' }} value="C">
                  C
                </option>
              </Select>
              <Tooltip label="Adicionar série">
                <Button
                  _hover={{
                    opacity: 0.8,
                  }}
                  onClick={() => {
                    addSeries(selectedSerie.name)
                  }}
                >
                  <Plus />
                </Button>
              </Tooltip>
            </HStack>

            <HStack gap={5} mb={12} alignItems={'start'}>
              <div className="space-y-2">
                <Label htmlFor="teamname">Exercicio</Label>
                <Input id="teamname" type="text" className={'max-w-96'} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamname">Grupo Muscular</Label>
                <Select
                  width={'200px'}
                  onChange={(e) => {
                    console.log(e.target.value)
                  }}
                  icon={<MdArrowDropDown />}
                  size="md"
                  borderColor="pink.500"
                  _hover={{
                    borderColor: 'pink.500',
                  }}
                >
                  <option style={{ background: '#353646' }} value="A">
                    Braço
                  </option>
                  <option style={{ background: '#353646' }} value="B">
                    Perna
                  </option>
                  <option style={{ background: '#353646' }} value="C">
                    Ombro
                  </option>
                </Select>
              </div>
            </HStack>

            <Container>
              <div className="w-full min-w-full rounded-md border">
                <Table className="bg mx-auto w-full md:max-w-[750px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-auto"></TableHead>
                      <TableHead className="w-auto">#</TableHead>
                      <TableHead className="flex-grow">Nome</TableHead>
                      <TableHead className="w-auto"></TableHead>
                    </TableRow>
                  </TableHeader>
                  {exercises.map((it, i) => {
                    return (
                      <TableBody key={i}>
                        <TableRow>
                          <TableCell>
                            <Checkbox
                              isChecked={it.selected}
                              size="lg"
                              onChange={() => {
                                const added = addDraft(it.name)
                                if (added) {
                                  setExercises((prev) => {
                                    return prev.map((item) => {
                                      if (item.name === it.name) {
                                        return {
                                          ...item,
                                          selected: !item.selected,
                                        }
                                      }
                                      return item
                                    })
                                  })
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <p>{i + 1}</p>
                          </TableCell>
                          <TableCell>
                            <p>{`${it.name}`}</p>
                          </TableCell>
                          <TableCell>
                            <p>teste</p>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )
                  })}
                </Table>
              </div>

              <VStack alignItems={'end'} mt={3}>
                <Tooltip label="Adicionar">
                  <Button
                    onClick={() => {
                      handleSeries()
                      setExercises(
                        exercises.map((exercise) => ({
                          ...exercise,
                          selected: false,
                        })),
                      )
                    }}
                    _hover={{
                      opacity: 0.8,
                    }}
                  >
                    <ArrowBigDownDash />
                  </Button>
                </Tooltip>
              </VStack>
            </Container>

            <Tabs
              // onChange={handleTabChange}
              isFitted
              variant="enclosed"
              style={{
                marginTop: '20px',
                background: '#353646',
                borderRadius: '8px',
                borderColor: '#353646',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            >
              <TabList>
                {series.map((s) => {
                  return <Tab key={s}>{s}</Tab>
                })}
              </TabList>
              <TabPanels>
                <TabPanel>
                  {exercisesByTab.map((it) => {
                    return <p key={it}>{it}</p>
                  })}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        </Box>
      </Flex>
    </Flex>
  )
}
