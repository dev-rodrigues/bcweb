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
import { MotionConfig } from 'framer-motion'
import { ArrowBigDownDash, ArrowLeft, Plus, Search } from 'lucide-react'
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
import { StudentsTableRow } from '@/pages/app/students/students-table-row.tsx'
import { CreateTraining } from '@/pages/app/training/create'
import { useSeries } from '@/services/series-hook.ts'

export function Training() {
  const { series, addSeries } = useSeries()

  const [select, setSelect] = useState<string>('A')

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
                  setSelect(e.target.value)
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
              <Button
                _hover={{
                  opacity: 0.8,
                }}
                onClick={() => {
                  addSeries(select)
                }}
              >
                <Plus />
              </Button>
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

              <div className="mt-8">
                <Button
                  _hover={{
                    opacity: 0.8,
                  }}
                  onClick={() => {
                    console.log('cuco')
                  }}
                >
                  <Search />
                </Button>
              </div>
            </HStack>

            <Container>
              <div className="w-full min-w-full rounded-md border">
                <Table className="mx-auto w-full md:max-w-[750px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-auto"></TableHead>
                      <TableHead className="w-auto">#</TableHead>
                      <TableHead className="flex-grow">Nome</TableHead>
                      <TableHead className="w-auto"></TableHead>
                    </TableRow>
                  </TableHeader>
                  {Array(3)
                    .fill(null)
                    .map((_, i) => {
                      return (
                        <TableBody key={i}>
                          <TableRow>
                            <TableCell>
                              <Checkbox size="lg" />
                            </TableCell>
                            <TableCell>
                              <p>1</p>
                            </TableCell>
                            <TableCell>
                              <p>{`teste ${i}`}</p>
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
                {series.map((it) => {
                  return (
                    <TabPanel key={it}>
                      <CreateTraining />
                    </TabPanel>
                  )
                })}
              </TabPanels>
            </Tabs>
          </>
        </Box>
      </Flex>
    </Flex>
  )
}
