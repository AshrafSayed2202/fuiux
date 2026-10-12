import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CardBorders from "../ui/CardBorders"
import Header from "../ui/Header"
import { useScrambleText } from "../hooks/useScrambleText"
import hoverSound from "../assets/sounds/hover.wav"
import clickSound from "../assets/sounds/click.wav"
import secondaryHoverSound from "../assets/sounds/secondary-hover.wav"
import Arrow from "../assets/svgs/Arrow"
import { PROJECTS, FILTERS } from "../data/projects"

const PAGE_SIZE = 4

const fetchProjects = (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isAll = filters.length === 1 && filters[0] === "All"
      const filtered = isAll
        ? PROJECTS
        : PROJECTS.filter((project) => filters.includes(project.category))
      const items = filtered.slice(0, PAGE_SIZE)
      resolve({
        items,
        hasMore: items.length < filtered.length,
      })
    }, 450)
  })
}

const FilterButton = ({ text, isActive, onClick }) => {
  const playHover = () => {
    const audio = new Audio(secondaryHoverSound)
    audio.volume = 0.15
    audio.play().catch(() => { })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={playHover}
      className={`py-2 cursor-pointer rounded-lg text-[12px] outline flex-1 relative group ${isActive
        ? "bg-[#ff00331a] text-[#FF0033] outline-transparent"
        : "bg-[#ffffff08] text-[#ffffff80] outline-[#ffffff14]"
        }`}
    >
      {text}
      <CardBorders byHover={true} active={isActive} />
    </button>
  )
}

const CardImage = ({ image, title }) => {
  return (
    <div className="relative overflow-hidden border border-[#ffffff0d] rounded-2xl">
      <div className="w-full h-full bg-linear-360 from-black via-black/60 to-black/5 absolute z-5 group-hover:opacity-0 duration-300" />
      <div className="w-full h-full bg-linear-360 from-rose-600/10 via-rose-600/5 to-rose-600/0 absolute z-5 opacity-0 group-hover:opacity-100 duration-300" />
      <img
        src={image}
        alt={title}
        className="aspect-4/3 group-hover:scale-105 duration-300"
      />
      <CardBorders touchy={true} />
    </div>
  )
}

const ProjectCard = ({ project }) => {
  const navigate = useNavigate()
  const playHover = () => {
    const audio = new Audio(secondaryHoverSound)
    audio.volume = 0.15
    audio.play().catch(() => { })
  }
  const [arrowHover, setArrowHover] = useState(false)

  const handleArrowClick = (e) => {
    e.stopPropagation()
    navigate(`/projects/${project.id}`)
  }

  return (
    <article className="group relative overflow-hidden border-b border-[#282727] duration-300 hover:border-[#FF0033]">
      <div className="relative overflow-hidden">
        <CardImage image={project.image} title={project.title} />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex gap-2 items-center">
          <p className="text-rose-600 text-[10px]">0{project.id}</p>
          <span className="inline-block h-px w-8.75 bg-red-400"></span>
          <p className="text-neutral-400 text-xs">
            {project.category}
          </p>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-white text-4xl font-black group-hover:text-[#FF0033] duration-300">
            {project.title}
          </h3>
          <div
            className="p-1 cursor-pointer hover:rotate-45 duration-300 group"
            onClick={handleArrowClick}
            onMouseEnter={() => { playHover(); setArrowHover(true) }}
            onMouseLeave={() => { setArrowHover(false) }}
          >
            <Arrow hover={arrowHover} />
          </div>
        </div>
      </div>
    </article>
  )
}

const ViewMoreButton = ({ onClick }) => {
  const { text, start, stop, click } = useScrambleText("VIEW MORE", {
    hoverSound,
    clickSound,
    volume: 0.45,
  })

  return (
    <button
      type="button"
      onMouseEnter={start}
      onMouseLeave={stop}
      onClick={() => {
        click()
        onClick?.()
      }}
      className="bg-[#FF0033CC] px-15 py-5 text-sm text-white font-bold cursor-pointer hover:bg-[#ff0033] duration-300 relative overflow-hidden w-54 h-15 text-nowrap"
    >
      <span className=" bg-[#0A0A0A] block absolute h-10 w-10 -left-5 -bottom-5 rotate-45"></span>
      <span className=" bg-[#0A0A0A] block absolute h-10 w-10 -right-5 -top-5 rotate-45"></span>
      {text}
      <CardBorders byHover={false} active={false} />
    </button>
  )
}

const ProjectsSection = () => {
  const navigate = useNavigate()
  const [activeFilters, setActiveFilters] = useState(["All"])
  const [projects, setProjects] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setIsLoading(true)
      const result = await fetchProjects(activeFilters)
      if (cancelled) return
      setProjects(result.items)
      setHasMore(result.hasMore)
      setIsLoading(false)
    }

    load()

    return () => {
      cancelled = true
    }
  }, [activeFilters])

  const handleFilterClick = (filter) => {
    if (filter === "All") {
      setActiveFilters(["All"])
      return
    }

    setActiveFilters((prev) => {
      const selected = prev.filter((item) => item !== "All")
      if (selected.includes(filter)) {
        const next = selected.filter((item) => item !== filter)
        return next.length ? next : ["All"]
      }
      return [...selected, filter]
    })
  }

  const handleViewMore = () => {
    navigate("/projects")
  }

  return (
    <div className="bg-[#0A0A0A] relative min-h-screen overflow-hidden!" id="work">
      <div className="relative w-full flex container flex-col gap-6.25 pt-20 pb-30">
        <Header header="Selected Work" />
        <h1 className="text-[80px] font-extrabold text-white leading-[100%] tracking-[-1.6px]">
          Projects that
          <span className="neon-text"> define</span> me.
        </h1>
        <div className="flex flex-col gap-16">
          <div className="flex flex-wrap gap-2.25">
            {FILTERS.map((filter) => (
              <FilterButton
                key={filter}
                text={filter}
                isActive={activeFilters.includes(filter)}
                onClick={() => handleFilterClick(filter)}
              />
            ))}
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <div
                  key={index}
                  className="h-105 animate-pulse rounded-2xl bg-[#ffffff08] border border-[#ffffff14]"
                />
              ))}
            </div>
          ) : projects.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-[#ffffff80] text-[16px]">
              No projects match the selected filters.
            </p>
          )}
          {!isLoading && hasMore && (
            <div className="flex justify-center">
              <ViewMoreButton onClick={handleViewMore} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection