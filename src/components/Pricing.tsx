import {
  Box,
  Button,
  Center,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import { CheckIcon } from 'lucide-react'

import { ContentPlanSchemaType } from '@/types/common-plan.ts'

type PricingProps = {
  data: ContentPlanSchemaType
}

export function Pricing({ data }: PricingProps) {
  return (
    <Center py={6} flexShrink="0">
      <Box
        maxW={'330px'}
        bg={'gray.300'}
        rounded={'md'}
        _hover={{
          transform: 'translateX(-1px)',
          transition: 'all 0.3s',
          opacity: 0.9,
        }}
      >
        <Stack
          textAlign={'center'}
          p={'50px'}
          color={'gray.800'}
          align={'center'}
          boxShadow={
            '0px 10px 15px 100px rgba(255, 0, 0, 1), 0px 4px 6px -2px rgba(255, 0, 0, 1)'
          }
        >
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={'green.100'}
            p={2}
            px={3}
            color={'green.500'}
            rounded={'full'}
          >
            {data.type}
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'} p={15}>
            <Text fontSize={'3xl'}>R$</Text>
            <Text
              fontSize={{
                base: '2xl',
                md: '5xl',
              }}
              fontWeight={600}
            >
              {data.price}
            </Text>
            <Text color={'gray.500'}>/mês</Text>
          </Stack>
        </Stack>

        <Box bg={'white'} px={6} py={10}>
          <List spacing={3}>
            {data.offers.map((offer, key) => (
              <ListItem color={'black'} key={key}>
                <ListIcon as={CheckIcon} color="green.400" />
                {offer.name}
              </ListItem>
            ))}
          </List>

          <Button
            mt={10}
            w={'full'}
            bg={'green.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}
          >
            Editar
          </Button>
        </Box>
      </Box>
    </Center>
  )
}
