import { Container, Heading, HStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { Pricing } from '@/components/Pricing.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx'

export function Plans() {
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
        <Heading>Plans</Heading>

        <div className="w-full min-w-full space-y-2.5">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                style={{
                  border: 'none',
                  borderColor: 'transparent',
                }}
                size="xs"
              >
                Novo
              </Button>
            </DialogTrigger>
          </Dialog>
          <div className="w-full min-w-full rounded-md border">
            <HStack spacing={4} overflowX="auto">
              <Pricing plan={'Gratuito'} price={'0,00'} />
              <Pricing plan={'Mensal'} price={'400,00'} />
              <Pricing plan={'Anual'} price={'300,00'} />
            </HStack>
          </div>
        </div>
      </Container>
    </>
  )
}
