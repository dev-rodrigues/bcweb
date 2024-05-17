import { Box, Icon, LinkProps, Text } from '@chakra-ui/react'
import { ElementType } from 'react'

import ActiveLink from '@/components/ActiveLink'

interface ItemProps extends LinkProps {
  icon: ElementType
  children: string
}

export function Item({ icon, children, ...rest }: ItemProps) {
  return (
    <Box display="flex">
      <Icon as={icon} fontSize="20" />
      <ActiveLink display="flex" alignItems="center" transition=".4s" {...rest}>
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ActiveLink>
    </Box>
  )
}
