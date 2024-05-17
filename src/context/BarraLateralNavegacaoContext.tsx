import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { createContext, ReactNode, useContext } from 'react'

interface BarraLateralNavegacaoProviderProps {
  children: ReactNode
}

type BarraLateralNavegacaoData = UseDisclosureReturn

const BarraLateralNavegacaoContext = createContext(
  {} as BarraLateralNavegacaoData,
)

export function BarraLateralNavegacaoProvider({
  children,
}: BarraLateralNavegacaoProviderProps) {
  const disclosure = useDisclosure()

  return (
    <BarraLateralNavegacaoContext.Provider value={disclosure}>
      {children}
    </BarraLateralNavegacaoContext.Provider>
  )
}

export const useBarraLateralNavegacao = () =>
  useContext(BarraLateralNavegacaoContext)
