import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './components/Navbar.tsx'
import Container from './components/Container.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Container>
      <Navbar />
      <App />
    </Container>
  </StrictMode>,
)
