import { Container, Heading, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pricing } from '@/components/Pricing.tsx'
import { Button } from '@/components/ui/button.tsx'
import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { CreatePlan } from '@/pages/app/plans/create'
import { usePlans } from '@/services/plans-hook.ts'

export function Plans() {
  const [open, setOpen] = useState(false)
  const { data, isFetching } = usePlans()

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <Helmet title={'Plans'} />
      <Container
        display={'flex'}
        width={'100%'}
        flexDirection={'column'}
        minW={'full'}
        gap={4}
      >
        <Heading>My Plans</Heading>

        <div className="w-full min-w-full space-y-2.5">
          <Button
            onClick={handleOpen}
            style={{
              border: 'none',
              borderColor: 'transparent',
            }}
            size="xs"
          >
            Novo
          </Button>
          <CreatePlan onRequestClose={handleOpen} isOpen={open} />

          <div className="w-full min-w-full rounded-md border">
            <HStack spacing={4} overflowX="auto">
              {isFetching ? (
                <LoadingSpinner />
              ) : data?.length ? (
                data.map((it, key) => <Pricing key={key} data={it} />)
              ) : (
                <p>Nenhum plano disponível</p>
              )}
            </HStack>
          </div>
        </div>
      </Container>
    </>
  )
}
