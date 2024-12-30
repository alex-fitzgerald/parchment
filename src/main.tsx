import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DemoApp from './demo-app.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoApp />
  </StrictMode>,
)