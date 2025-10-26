import { useEffect } from 'react'
import { useDarkMode } from './hooks/useDarkMode'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import CustomCursor from './components/CustomCursor/CustomCursor'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle'
import Hero from './sections/Hero/Hero'
import Showcase3D from './sections/Showcase3D/Showcase3D'
import Services from './sections/Services/Services'
import Portfolio from './sections/Portfolio/Portfolio'
import Testimonials from './sections/Testimonials/Testimonials'
import Contact from './sections/Contact/Contact'
import Footer from './sections/Footer/Footer'

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode()
  useSmoothScroll()

  useEffect(() => {
    // Add class to html for Lenis
    document.documentElement.classList.add('lenis')
  }, [])

  return (
    <div className="relative">
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Dark mode toggle */}
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <Showcase3D />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
