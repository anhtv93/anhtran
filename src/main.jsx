import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ContactRouterDemo from './ContactRouterDemo.jsx'

const Root = window.location.hash === '#contact-demo' ? ContactRouterDemo : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
