import { jwtDecode } from 'jwt-decode'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

import { signIn, SignInBody } from '@/api/sign-in.ts'
import { api } from '@/lib/axios.ts'
import { localStorageName } from '@/types/common.ts'
import { ContentItemSchemaType } from '@/types/common-users.ts'

interface AuthContextData {
  user: ContentItemSchemaType | undefined | null
  login(credentials: SignInBody): Promise<void>
  logout(): void
  isAuthenticated(): boolean
  hasPermission(roles: string[]): boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

interface SignInProps {
  login: string
  password: string
}

interface JwtDataProps {
  role: string[]
  customerName: string
  customerEmail: string
  customerPhone: string
  customerEmailValidated: boolean
}

interface JwtProps {
  data: string
  iss: string
  sub: string
  exp: number
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<ContentItemSchemaType | null>(() => {
    const authorization = localStorage.getItem(localStorageName)

    if (authorization) {
      const decodedObject = getDecodedData(authorization)

      return {
        id: 123,
        name: decodedObject.customerName,
        roles: decodedObject.role,
        email: decodedObject.customerEmail,
        phone: decodedObject.customerPhone,
        customerEmailValidated: decodedObject.customerEmailValidated,
      }
    }

    return null
  })

  const login = useCallback(async ({ login, password }: SignInProps) => {
    const response = await signIn({
      login,
      password,
    })

    const authorization = response.headers.authorization.split(' ')[1]
    const decodedObject = getDecodedData(authorization)

    setData({
      id: 123,
      name: decodedObject.customerName,
      roles: decodedObject.role,
      email: decodedObject.customerEmail,
      phone: decodedObject.customerPhone,
      customerEmailValidated: decodedObject.customerEmailValidated,
    })

    localStorage.setItem(localStorageName, authorization)

    api.defaults.headers.Authorization = `Bearer ${authorization}`
  }, [])

  function getDecodedData(authorization: string): JwtDataProps {
    const decoded = jwtDecode<JwtProps>(authorization)
    const replacedString = decoded.data.replace(/'/g, '"')
    return JSON.parse(replacedString) as JwtDataProps
  }

  function hasPermission(roles: string[]): boolean {
    if (!data) {
      return false
    }

    return data.roles.some((role) => roles.includes(role))
  }

  function isAuthenticated(): boolean {
    return !!data
  }

  const logout = useCallback(() => {
    localStorage.removeItem(localStorageName)
    setData(null)
    delete api.defaults.headers.common.Authorization
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: data, login, logout, isAuthenticated, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
