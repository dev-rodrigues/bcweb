import { Link, LinkProps } from '@chakra-ui/react'
import { cloneElement, ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

interface LinkAtivoProps extends LinkProps {
  children: ReactElement
}

export default function ActiveLink({ children, ...rest }: LinkAtivoProps) {
  let isActive = false
  const localization = useLocation().pathname

  if (localization === rest.href || localization === rest.as) {
    isActive = true
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'red.400' : 'white',
      })}
    </Link>
  )
}
