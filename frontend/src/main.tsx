import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './components/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/**Me permite navegar entre páginas sin recargar la página completa*/}
    <BrowserRouter>
      {/**Me permite acceder al usuario*/}
      <AuthProvider>
        {/**La aplicación principal*/}
        <App/>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
