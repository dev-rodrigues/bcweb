import {
  Box,
  Button,
  Center,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckIcon } from 'lucide-react'

type PricingProps = {
  plan: string
  price: string
}

export function Pricing({ plan, price }: PricingProps) {
  return (
    <Center py={6} flexShrink="0">
      <Box
        maxW={'330px'}
        w={'full'}
        bg={'gray.300'}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        _hover={{
          transform: 'translateX(-1px)',
          transition: 'all 0.3s',
          opacity: 0.9,
        }}
      >
        <Stack
          textAlign={'center'}
          p={'50px'}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}
        >
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={useColorModeValue('green.50', 'green.900')}
            p={2}
            px={3}
            color={'green.500'}
            rounded={'full'}
          >
            {plan}
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'} p={15}>
            <Text fontSize={'3xl'}>R$</Text>
            <Text fontSize={'6xl'} fontWeight={600}>
              {price}
            </Text>
            <Text color={'gray.500'}>/mês</Text>
          </Stack>
        </Stack>

        <Box bg={'white'} px={6} py={10}>
          <List spacing={3}>
            <ListItem color={'black'}>
              <ListIcon as={CheckIcon} color="green.400" />
              Treinos populares
            </ListItem>
            <ListItem color={'black'}>
              <ListIcon as={CheckIcon} color="green.400" />
              Histórico de treinos
            </ListItem>
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
