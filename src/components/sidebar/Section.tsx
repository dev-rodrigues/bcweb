import { Box, Stack, Text } from '@chakra-ui/react'

interface SessaoProps {
  title?: string
  children: React.ReactNode
  mt?: number
}

export function Section({ title, mt, children }: SessaoProps) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      mt={mt}
      alignItems={'center'}
    >
      <Text fontWeight="bold" color="gray.400" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="2" align="stretch">
        {children}
      </Stack>
    </Box>
  )
}
