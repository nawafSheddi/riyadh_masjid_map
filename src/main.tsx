import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import 'maplibre-gl/dist/maplibre-gl.css'

// Hide the pre-rendered SEO content when the SPA takes over
const seoContent = document.getElementById('seo-content')
if (seoContent) {
  seoContent.style.display = 'none'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
