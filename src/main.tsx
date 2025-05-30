import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FxContextProvider } from './Context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FxContextProvider>
      <App />
    </FxContextProvider>
  </StrictMode>,
)
