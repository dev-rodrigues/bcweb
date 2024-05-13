import React, { createContext, ReactNode, useEffect, useState } from 'react'

const DeviceContext = createContext(false)

interface DeviceProviderProps {
  children: ReactNode
}

const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent =
        typeof window.navigator === 'undefined' ? '' : navigator.userAgent
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent,
        )
      setIsMobile(mobile)
    }

    checkMobile()

    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <DeviceContext.Provider value={isMobile}>{children}</DeviceContext.Provider>
  )
}

export { DeviceContext, DeviceProvider }
