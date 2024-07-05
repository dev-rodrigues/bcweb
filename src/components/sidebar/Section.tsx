import { Box, Stack, Text } from '@chakra-ui/react'

interface SessaoProps {
  title?: string
  children: React.ReactNode
}

export function Section({ title, children }: SessaoProps) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      mt={10}
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
