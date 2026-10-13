import { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { motion, useScroll, useSpring } from "framer-motion"
import { PROJECTS } from "../data/projects"
import CardBorders from "../ui/CardBorders"
import Footer from "./Footer"
import ProjectArrow from "../assets/svgs/ProjectArrow"
import KeyResults from "../assets/svgs/KeyResults"

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loadedId, setLoadedId] = useState(null)
  const loading = loadedId !== id

  const project = useMemo(
    () => PROJECTS.find((p) => String(p.id) === String(id)),
    [id]
  )

  const nextProject = useMemo(() => {
    if (!project) return null
    const idx = PROJECTS.findIndex((p) => p.id === project.id)
    return idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null
  }, [project])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setLoadedId(id), 400)
    return () => clearTimeout(t)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#FF0033] origin-left z-50" />
        <main className="pt-24 md:pt-32">
          <div className="max-w-360 mx-auto px-4 sm:px-6 mb-20">
            <div className=" border-[#6C061A] border-[3px] bg-[#0A0A0A] relative">
              <div className="grid grid-cols-1 lg:grid-cols-4 border-b-[3px] border-[#6C061A] border-[3px]">
                <div className="lg:col-span-3 p-6 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[#6C061A] border-[3px]">
                  <div className="h-4 w-40 bg-[#ffffff10] rounded animate-pulse" />
                </div>
                <div className="p-6 flex items-center justify-center">
                  <div className="h-4 w-16 bg-[#ffffff10] rounded animate-pulse" />
                </div>
              </div>
              <div className="p-6 md:p-12 lg:p-16 border-b-[3px] border-[#6C061A] border-[3px]">
                <div className="h-16 md:h-24 w-4/5 bg-[#ffffff10] rounded-xl animate-pulse" />
                <div className="mt-8 space-y-3 max-w-2xl">
                  <div className="h-4 bg-[#ffffff10] rounded animate-pulse" />
                  <div className="h-4 bg-[#ffffff10] rounded animate-pulse w-11/12" />
                  <div className="h-4 bg-[#ffffff10] rounded animate-pulse w-4/5" />
                </div>
              </div>
              <div className="aspect-video md:aspect-21/9 bg-[#ffffff08] animate-pulse" />
              <div className="grid lg:grid-cols-12 min-h-[50vh]">
                <div className="lg:col-span-3 border-r-[3px] border-[#6C061A] border-[3px] p-6 space-y-8">
                  <div className="h-9 bg-[#ffffff10] rounded animate-pulse" />
                  <div className="flex flex-wrap gap-2">
                    <div className="h-7 w-24 bg-[#ffffff10] rounded animate-pulse" />
                    <div className="h-7 w-20 bg-[#ffffff10] rounded animate-pulse" />
                  </div>
                </div>
                <div className="lg:col-span-9 p-6 md:p-12 space-y-10">
                  <div className="space-y-4">
                    <div className="h-8 w-56 bg-[#ffffff10] rounded animate-pulse" />
                    <div className="h-5 bg-[#ffffff10] rounded animate-pulse" />
                    <div className="h-5 bg-[#ffffff10] rounded animate-pulse w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/projects")}
            className="bg-[#FF0033] px-6 py-3 text-white font-bold hover:bg-[#ff0033]"
          >
            Back to Work
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF0033]/20">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF0033] origin-left z-50"
        style={{ scaleX }}
      />

      <main className="flex-1 pt-24 md:pt-32">
        <div className="max-w-360 mx-auto px-4 sm:px-6 mb-20">
          <div className=" bg-[#0A0A0A] relative z-10">
            {/* Top bar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 border-[#6C061A] border-[3px] border-b-0">
              <div className="lg:col-span-3 py-6 px-12 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[#6C061A] flex items-center gap-3">
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-3 text-sm uppercase tracking-[3.6px] text-[#FF0033] transition-colors"
                >
                  <span className="text-[#FF0033] transition-transform group-hover:-translate-x-1">
                    <ProjectArrow />
                  </span>
                  Back to Work
                </Link>
                <span className="text-[#FF0033]">/</span>
                <span className="text-sm text-[#FF6467] uppercase tracking-[3.6px]">
                  {project.title}
                </span>
              </div>
              <div className="p-6 flex items-center justify-between lg:justify-center text-sm font-medium text-[#FF6467] font-[inter]! relative">
                <span className="h-14.5 w-14.5 bg-[#0a0a0a] absolute -top-6.5 -right-8.25 border-b-[3px] border-[#6C061A] rotate-50"></span>
                <div className="font-mono">{project.year || "2024"}</div>
              </div>
            </div>

            {/* Title block */}
            <div className="p-6 md:p-12 lg:p-16 border-b-0 border-[#6C061A] border-[3px]">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight uppercase"
              >
                {project.title}
              </motion.h1>

              <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
                  {project.description}
                </p>
                <div className="px-4 py-2 rounded-full border-[#6C061A] border-[3px] text-xs font-bold uppercase tracking-widest bg-[#ffffff08]">
                  Case Study
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="w-full border-b-[3px] border-[#6C061A] border-[3px] overflow-hidden bg-[#ffffff05]">
              <motion.div
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="aspect-video md:aspect-21/9 w-full relative"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                <CardBorders touchy={true} />
              </motion.div>
            </div>

            {/* Sidebar + Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[50vh]">
              <div className="lg:col-span-3 border-r-[3px] border-t-0 border-[#6C061A] border-[3px] pb-10 relative">
                <div className="sticky top-24">
                  <div className="flex flex-col">
                    <div className="p-6 border-b-[3px] border-[#6C061A] relative group transition-colors">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                        Client
                      </h4>
                      <p className="text-lg font-black leading-tight group-hover:translate-x-1 transition-transform duration-300">
                        {project.client || "Confidential"}
                      </p>
                    </div>

                    <div className="p-6 relative transition-colors">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4">
                        Scope of Work
                      </h4>
                      <div className="flex flex-wrap gap-2.25">
                        {(project.scope || []).map((item, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg border border-[#ffffff0d] bg-[#ffffff05] text-[#ffffff80] text-[12px] hover:text-[#FF0033] duration-500 px-3 py-1.5 cursor-pointer relative overflow-hidden group"
                          >
                            {item}
                            <CardBorders />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <span className="h-14.5 w-14.5 bg-[#0a0a0a] absolute -bottom-6.5 -left-8.25 border-t-[3px] border-[#6C061A] rotate-50"></span>
              </div>

              <div className="lg:col-span-9 p-6 md:p-12 lg:p-16 border-r-[3px] border-b-[3px] border-[#6C061A]">
                <motion.article
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-none"
                >
                  {(project.sections || []).map((section, index) => (
                    <div key={index} className="mb-16">
                      <h3 className="text-2xl md:text-3xl font-black mb-6">{section.title}</h3>
                      <p className="text-white/80 leading-relaxed text-lg">{section.content}</p>
                    </div>
                  ))}

                  {project.keyResults?.length > 0 && (
                    <div className="my-16">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF0033] mb-8">
                        Key Results
                      </h4>
                      <KeyResults />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.keyResults.map((result, i) => {
                          const parts = result.split(" ")
                          return (
                            <div key={i}>
                              <span className="block text-4xl md:text-5xl font-black mb-2">
                                {parts[0]}
                              </span>
                              <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                                {parts.slice(1).join(" ")}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </motion.article>

                {/* Gallery */}
                {project.gallery?.length > 0 && (
                  <div className="mt-12">
                    <div className="flex items-end justify-between mb-16">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
                          Visual Archive
                        </span>
                        <h3 className="text-3xl font-black">Design Artifacts</h3>
                      </div>
                      <span className="hidden md:block text-xs font-mono uppercase tracking-widest text-white/40">
                        {project.gallery.length} Assets
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.gallery.map((src, i) => (
                        <div
                          key={i}
                          className={`group relative overflow-hidden bg-[#ffffff05] border border-[#ffffff0d] ${i === 0 ? "md:col-span-2 aspect-21/9" : "aspect-square"
                            }`}
                        >
                          <img
                            src={src}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              View
                            </div>
                          </div>
                          <CardBorders touchy={true} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Insights */}
                {project.insights && (
                  <div className="mt-24 relative overflow-hidden bg-[#FF0033] text-white p-8 md:p-12">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 md:items-start">
                      <div className="md:w-1/4 pb-6 md:pb-0">
                        <span className="text-5xl md:text-6xl font-black block leading-none mb-2">
                          The Shift.
                        </span>
                        <span className="text-xs font-mono uppercase tracking-widest font-bold opacity-70">
                          Retrospective
                        </span>
                      </div>
                      <div className="md:w-3/4 md:pl-4">
                        <p className="text-xl md:text-2xl font-black leading-snug mb-4">
                          “{project.insights}”
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="h-px w-8 bg-white" />
                          <span className="text-xs font-mono uppercase tracking-widest font-bold">
                            Insights
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Next project */}
        <section className=" py-20">
          <div className="max-w-360 mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-black uppercase">Next Project</h2>
              <Link
                to="/projects"
                className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[#FF0033] transition-colors"
              >
                View All Work <span>→</span>
              </Link>
            </div>

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group block border-[#6C061A] border-[3px] bg-[#0A0A0A] p-8 hover:border-[#FF0033] transition-colors relative overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-video overflow-hidden bg-[#ffffff05] relative">
                    <img
                      src={nextProject.image}
                      alt={nextProject.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <CardBorders touchy={true} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                      <span className="text-[#FF0033]">{nextProject.category}</span>
                      <span>{nextProject.year || "2024"}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black leading-tight group-hover:text-[#FF0033] transition-colors mb-6">
                      {nextProject.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                      View Case Study
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="text-center py-12 text-white/40 italic">End of portfolio.</div>
            )}
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default ProjectDetail