import { BrowserRouter, Routes, Route } from "react-router-dom"
import AboutSection from "./components/AboutSection.jsx"
import HeroSection from "./components/HeroSection.jsx"
import Nav from "./components/Nav.jsx"
import ProjectsSection from "./components/ProjectsSection.jsx"
import TitlesSection from "./components/TitlesSection.jsx"
import ToolsSection from "./components/ToolsSection.jsx"
import PricingSection from "./components/PricingSection.jsx"
import CommentsSection from "./components/CommentsSection.jsx"

function HomePage() {
  return (
    <>
      <HeroSection />
      <TitlesSection />
      <AboutSection />
      <ToolsSection />
      <ProjectsSection />
      <PricingSection />
      <CommentsSection />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <main className="relative w-full">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsSection />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App