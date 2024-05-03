import axios from 'axios'

import { env } from '@/env.ts'
import { localStorageName } from '@/types/common.ts'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(localStorageName)}`,
  },
})
