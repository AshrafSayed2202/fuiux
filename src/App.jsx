import AboutSection from './components/AboutSection.jsx'
import HeroSection from './components/HeroSection.jsx'
import Nav from './components/Nav.jsx'
import TitlesSection from './components/TitlesSection.jsx'

function App() {

  return (
    <main className="relative w-full">
      <Nav />
      <HeroSection />
      <TitlesSection />
      <AboutSection />
    </main>
  )
}

export default App