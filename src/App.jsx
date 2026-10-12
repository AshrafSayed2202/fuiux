import { BrowserRouter, Routes, Route } from "react-router-dom"
import AboutSection from "./components/AboutSection.jsx"
import HeroSection from "./components/HeroSection.jsx"
import Nav from "./components/Nav.jsx"
import ProjectsSection from "./components/ProjectsSection.jsx"
import TitlesSection from "./components/TitlesSection.jsx"
import ToolsSection from "./components/ToolsSection.jsx"
import PricingSection from "./components/PricingSection.jsx"
import CommentsSection from "./components/CommentsSection.jsx"
import LetsSection from "./components/LetsSection.jsx"
import Footer from "./components/Footer.jsx"
import ProjectsPage from "./components/ProjectsPage.jsx"
import ProjectDetail from "./components/ProjectDetail.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"
import NotFound from "./components/NotFound.jsx"

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
      <LetsSection />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <main className="relative w-full">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App