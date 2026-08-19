import { useEffect, useState } from "react"
import CardBorders from "../ui/CardBorders"
import Header from "../ui/Header"

const PROJECTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    category: "Fintech Dashboard",
    title: "Nova Banking Console",
    labels: ["Fintech Dashboard", "Web Design"],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    category: "Mobile App",
    title: "Pulse Fitness Companion",
    labels: ["Mobile App"],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    category: "Games",
    title: "Arcade Night Multiplayer",
    labels: ["Games"],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    category: "Brand Identity",
    title: "Lumen Visual System",
    labels: ["Brand Identity"],
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1600&q=80",
    category: "Web Design",
    title: "Ember Studio Website",
    labels: ["Web Design", "Brand Identity"],
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80",
    category: "Car Infotainment Design",
    title: "Horizon EV Cockpit",
    labels: ["Car Infotainment Design"],
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    category: "Fintech Dashboard",
    title: "Vault Crypto Ledger",
    labels: ["Fintech Dashboard", "Web Design"],
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
    category: "Mobile App",
    title: "Atlas Travel Planner",
    labels: ["Mobile App", "Web Design"],
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=80",
    category: "Games",
    title: "Neon Racer Circuit",
    labels: ["Games", "Car Infotainment Design"],
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1600&q=80",
    category: "Brand Identity",
    title: "Meridian Identity Kit",
    labels: ["Brand Identity", "Web Design"],
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    category: "Web Design",
    title: "Apex Commerce Platform",
    labels: ["Web Design"],
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
    category: "Car Infotainment Design",
    title: "Orion Cluster Interface",
    labels: ["Car Infotainment Design", "Mobile App"],
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
    category: "Fintech Dashboard",
    title: "Flow Payments Hub",
    labels: ["Fintech Dashboard"],
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
    category: "Games",
    title: "Drift League UI",
    labels: ["Games", "Car Infotainment Design"],
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=80",
    category: "Brand Identity",
    title: "Craft & Co Brand World",
    labels: ["Brand Identity"],
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    category: "Mobile App",
    title: "Ledger Pro Wallet",
    labels: ["Mobile App", "Fintech Dashboard"],
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

const fetchProjects = (filters, page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isAll = filters.length === 1 && filters[0] === "All"
      const filtered = isAll
        ? PROJECTS
        : PROJECTS.filter((project) =>
          project.labels.some((label) => filters.includes(label))
        )
      const start = (page - 1) * PAGE_SIZE
      const items = filtered.slice(start, start + PAGE_SIZE)
      resolve({
        items,
        hasMore: start + items.length < filtered.length,
      })
    }, 450)
  })
}

const FilterButton = ({ text, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2 rounded-lg text-[12px] border flex-1 relative overflow-hidden group ${isActive
          ? "bg-[#ff00331a] text-[#FF0033] border-transparent"
          : "bg-[#ffffff08] text-[#ffffff80] border-[#ffffff14]"
        }`}
    >
      {text}
      <CardBorders byHover={false} active={isActive} />
    </button>
  )
}

const ProjectCard = ({ project }) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-[#ffffff08] border border-[#ffffff14]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[#FF0033]">
          {project.category}
        </p>
        <h3 className="text-[28px] font-bold leading-[110%] text-white">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.labels.map((label) => (
            <span
              key={label}
              className="rounded-full border border-[#ffffff14] bg-[#ffffff08] px-3 py-1 text-[11px] text-[#ffffff80]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

const ProjectsSection = () => {
  const [activeFilters, setActiveFilters] = useState(["All"])
  const [projects, setProjects] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setIsLoading(true)
      const result = await fetchProjects(activeFilters, 1)
      if (cancelled) return
      setProjects(result.items)
      setHasMore(result.hasMore)
      setPage(1)
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

  const handleViewMore = async () => {
    if (isLoadingMore || !hasMore) return
    setIsLoadingMore(true)
    const nextPage = page + 1
    const result = await fetchProjects(activeFilters, nextPage)
    setProjects((prev) => [...prev, ...result.items])
    setHasMore(result.hasMore)
    setPage(nextPage)
    setIsLoadingMore(false)
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
                  className="h-[420px] animate-pulse rounded-2xl bg-[#ffffff08] border border-[#ffffff14]"
                />
              ))}
            </div>
          ) : projects.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                disabled={isLoadingMore}
                className="relative overflow-hidden rounded-lg border border-[#ffffff14] bg-[#ffffff08] px-8 py-3 text-[14px] text-white disabled:opacity-60"
              >
                {isLoadingMore ? "Loading..." : "View More"}
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