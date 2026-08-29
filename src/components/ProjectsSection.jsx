import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CardBorders from "../ui/CardBorders"
import Header from "../ui/Header"

const PROJECTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    category: "Fintech Dashboard",
    title: "Nova Banking Console",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    category: "Mobile App",
    title: "Pulse Fitness Companion",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    category: "Games",
    title: "Arcade Night Multiplayer",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    category: "Brand Identity",
    title: "Lumen Visual System",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1600&q=80",
    category: "Web Design",
    title: "Ember Studio Website",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80",
    category: "Car Infotainment Design",
    title: "Horizon EV Cockpit",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    category: "Fintech Dashboard",
    title: "Vault Crypto Ledger",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
    category: "Mobile App",
    title: "Atlas Travel Planner",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=80",
    category: "Games",
    title: "Neon Racer Circuit",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1600&q=80",
    category: "Brand Identity",
    title: "Meridian Identity Kit",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    category: "Web Design",
    title: "Apex Commerce Platform",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
    category: "Car Infotainment Design",
    title: "Orion Cluster Interface",
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
    category: "Fintech Dashboard",
    title: "Flow Payments Hub",
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
    category: "Games",
    title: "Drift League UI",
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=80",
    category: "Brand Identity",
    title: "Craft & Co Brand World",
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    category: "Mobile App",
    title: "Ledger Pro Wallet",
  },
]

const FILTERS = [
  "All",
  "Web Design",
  "Mobile App",
  "Fintech Dashboard",
  "Brand Identity",
  "Games",
  "Car Infotainment Design",
]

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
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2 rounded-lg text-[12px] outline flex-1 relative group ${isActive
        ? "bg-[#ff00331a] text-[#FF0033] outline-transparent"
        : "bg-[#ffffff08] text-[#ffffff80] outline-[#ffffff14]"
        }`}
    >
      {text}
      <CardBorders byHover={false} active={isActive} />
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
        <h3 className="text-white text-4xl font-black group-hover:text-[#FF0033] duration-300">
          {project.title}
        </h3>
      </div>
    </article>
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
    <div className="bg-[#0A0A0A] relative min-h-screen overflow-hidden!">
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
              <button
                type="button"
                onClick={handleViewMore}
                className="bg-[#FF0033CC] px-15 py-5 text-sm text-white font-bold cursor-pointer hover:bg-[#ff0033] duration-300 relative overflow-hidden"
              >
                <span className=" bg-[#0A0A0A] block absolute h-10 w-10 -left-5 -bottom-5 rotate-45"></span>
                <span className=" bg-[#0A0A0A] block absolute h-10 w-10 -right-5 -top-5 rotate-45"></span>
                View More
                <CardBorders byHover={false} active={false} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection