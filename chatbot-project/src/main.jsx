import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// This code setups the react
// Strict mode is a special component provided by react
// <StrictMode> = gives us some additional checks and warnings when developing our app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
