import axios from 'axios'

import { env } from '@/env.ts'
import { localStorageName } from '@/types/common.ts'

export const api = getApi()

function getApi() {
  const token = localStorage.getItem(localStorageName)
  const authorization = `Bearer ${token}`

  console.log(authorization)

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = authorization
  }

  console.log(headers)

  return axios.create({
    baseURL: env.VITE_API_URL,
    headers,
  })
}
