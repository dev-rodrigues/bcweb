import { DevSupport } from '@react-buddy/ide-toolbox'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { ComponentPreviews, useInitial } from '@/dev'

import { App } from './app.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DevSupport
      ComponentPreviews={ComponentPreviews}
      useInitialHook={useInitial}
    >
      <App />
    </DevSupport>
    <Analytics />
  </React.StrictMode>,
)
