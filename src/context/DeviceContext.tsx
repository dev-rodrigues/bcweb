import React, { createContext, ReactNode, useEffect, useState } from 'react'

const DeviceContext = createContext(false)

interface DeviceProviderProps {
  children: ReactNode
}

const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      )
    setIsMobile(mobile)
  }, [])

  return (
    <DeviceContext.Provider value={isMobile}>{children}</DeviceContext.Provider>
  )
}

export { DeviceContext, DeviceProvider }
