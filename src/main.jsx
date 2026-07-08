import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import N8nVersion from './N8nVersion.jsx'

const Root = window.location.hash.startsWith('#n8n') ? N8nVersion : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
