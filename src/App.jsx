import AboutSection from './components/AboutSection.jsx'
import HeroSection from './components/HeroSection.jsx'
import Nav from './components/Nav.jsx'
import TitlesSection from './components/TitlesSection.jsx'
import ToolsSection from './components/ToolsSection.jsx'

function App() {

  return (
    <main className="relative w-full">
      <Nav />
      <HeroSection />
      <TitlesSection />
      <AboutSection />
      <ToolsSection />
    </main>
  )
}

export default App