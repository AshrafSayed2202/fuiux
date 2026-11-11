import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import lineArt from "../assets/images/loader/line.svg"
import ringGlow from "../assets/images/loader/ring-glow.svg"
import bigRing from "../assets/images/loader/big-ring.svg"
import logoArt from "../assets/images/loader/logo.svg"
import { whenAssetsReady } from "../lib/assetLoading"
import { useMediaQuery } from "../hooks/useMediaQuery"

/**
 * Loading screen (Figma "Loading" frames, desktop 2343:4757 and mobile 2779:2260).
 *
 * Plays the timeline map intro once: the year markers light up along the red path, the ring
 * around 2027 swings into place, the wordmark scales in, the three dots appear and the red
 * bar fills. It then holds (dots pulsing) until every site asset has loaded, and fades out.
 */

const DESKTOP_QUERY = "(min-width: 1024px)"
const DESKTOP = { w: 1920, h: 901 }
const MOBILE = { w: 390, h: 844 }
// Mobile map = desktop map rotated a quarter turn clockwise and scaled (from the Figma frame).
const MOBILE_MAP = { scale: 0.4106, x: 389.95 }

// Intro length. The Figma timeline is 5.9s on a loop; the same proportions are kept.
const INTRO_S = 4
// Fraction of the intro at which the last element has arrived (bar full, 2029 lit).
const INTRO_END = 0.8433
// Never hold the screen longer than this waiting for assets.
const ASSET_TIMEOUT_MS = 15000

const RING = 84
const GLOW = 284
const STOP = 32

// Stop marker (Figma "Ellipse 49" / "Ellipse 47"): translucent red ring with a red edge on
// both its outer and inner rim. Drawn inline because the Figma export relies on a backdrop
// blur that image tags cannot render.
const STOP_PATH =
  "M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM10.1704 16C10.1704 19.2196 12.7804 21.8296 16 21.8296C19.2196 21.8296 21.8296 19.2196 21.8296 16C21.8296 12.7804 19.2196 10.1704 16 10.1704C12.7804 10.1704 10.1704 12.7804 10.1704 16Z"

const StopMarker = ({ id, x, y }) => (
  <svg
    className="absolute"
    style={{ left: x, top: y, width: STOP, height: STOP }}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={STOP_PATH} fill="#B8101D" fillOpacity="0.3" />
    <mask id={`stop-mask-${id}`} fill="white">
      <path d={STOP_PATH} />
    </mask>
    <path d={STOP_PATH} stroke="#B8101D" strokeWidth="4" mask={`url(#stop-mask-${id})`} />
  </svg>
)

// Desktop frame coordinates (px). `ring` is the top-left of the 84px ring box; `label` the
// top-left of the year text; `t` the fade-in window as a fraction of the intro.
const MARKERS = [
  { year: "2019", ring: [64, 307], label: [30, 363], t: [0, 0.0844] },
  {
    year: "2020",
    ring: [268, 502],
    label: [169, 536],
    second: { year: "2021", label: [397, 536] },
    dashes: [[238, 544], [332, 544]],
    t: [0.0844, 0.1688],
  },
  { year: "2022", ring: [420, 746], label: [382, 796], t: [0.1688, 0.2531] },
  { year: "2023", ring: [543, 754], label: [618, 812], t: [0.2531, 0.3375] },
  { year: "2024", ring: [808, 613], label: [885, 665], t: [0.3375, 0.4219] },
  { year: "2025", ring: [918, 513], label: [995, 561], t: [0.4219, 0.5063] },
  { year: "2026", ring: [1026, 417], label: [1097, 474], t: [0.5063, 0.5907] },
  {
    year: "2027",
    ring: [1189, 339],
    label: [1318, 371],
    big: true,
    dashes: [[1159, 380], [1253, 380]],
    t: [0.5907, 0.6751],
  },
  // On the phone these two stops sit close together, so their labels take the sides the
  // Figma mobile frame gives them (2028 left of its stop, 2029 right of its stop); offsets
  // are from the stop centre.
  { year: "2028", ring: [1384, 244], label: [1459, 295], sub: "Loading", t: [0.6751, 0.7594], mobileLabel: { right: 26, top: -10 } },
  { year: "2029", ring: [1467, 123], label: [1406, 123], sub: "Loading", t: [0.7594, 0.8438], mobileLabel: { left: 26, top: -10 } },
]

const fadeIn = ([a, b]) => ({
  duration: INTRO_S,
  times: [0, a, b, 1],
  ease: ["linear", "easeOut", "linear"],
})

const useViewport = () => {
  const read = () => ({ w: window.innerWidth, h: window.innerHeight })
  const [size, setSize] = useState(read)
  useEffect(() => {
    const onResize = () => setSize(read())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return size
}

/**
 * Year text (plus optional small red line under it), positioned relative to its stop.
 * `at` is {left|right, top}; a right-anchored label is right-aligned.
 */
const Label = ({ at, year, sub, mobile }) => (
  <div className={`absolute flex flex-col whitespace-nowrap ${at.right !== undefined ? "items-end" : ""}`} style={at}>
    <span className="font-bold text-white leading-none" style={{ fontSize: mobile ? 20 : 16 }}>
      {year}
    </span>
    {sub && (
      <span className="text-[#B8101D] leading-none mt-1" style={{ fontSize: mobile ? 16 : 12 }}>
        {sub}
      </span>
    )}
  </div>
)

/** The red path with its markers, in desktop coordinates; transformed as a whole on mobile. */
const MapLayer = ({ mobile }) => (
  <div
    className="absolute left-0 top-0 origin-top-left"
    style={{
      width: DESKTOP.w,
      height: DESKTOP.h,
      transform: mobile ? `translate(${MOBILE_MAP.x}px, 0) rotate(90deg) scale(${MOBILE_MAP.scale})` : undefined,
    }}
  >
    <img
      src={lineArt}
      alt=""
      className="absolute max-w-none pointer-events-none"
      style={{ left: -300, top: -300, width: 2177, height: 1414 }}
    />
    {MARKERS.map((m) => {
      const cx = m.ring[0] + RING / 2
      const cy = m.ring[1] + RING / 2
      return (
        <motion.div
          key={m.year}
          className="absolute left-0 top-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={fadeIn(m.t)}
        >
          {m.big && (
            <motion.img
              src={bigRing}
              alt=""
              className="absolute max-w-none"
              style={{ left: 1051, top: 201, width: 360, height: 360 }}
              initial={{ rotate: -180 }}
              animate={{ rotate: [-180, -180, 0, 0] }}
              transition={{ duration: INTRO_S, times: [0, 0.6751, 0.8433, 1], ease: ["linear", "easeOut", "linear"] }}
            />
          )}
          <img
            src={ringGlow}
            alt=""
            className="absolute max-w-none"
            style={{ left: cx - GLOW / 2, top: cy - GLOW / 2, width: GLOW, height: GLOW }}
          />
          {!m.big && <StopMarker id={m.year} x={cx - STOP / 2} y={cy - STOP / 2} />}

          {/* Labels, dashes and the logo keep their desktop arrangement around the stop: on
              the rotated phone map the whole cluster is turned back around the stop centre. */}
          <div
            className="absolute"
            style={{ left: cx, top: cy, width: 0, height: 0, transform: mobile ? "rotate(-90deg)" : undefined }}
          >
            {m.big && (
              <img src={logoArt} alt="" className="absolute max-w-none" style={{ left: 1199 - cx, top: 333 - cy, width: 63, height: 74 }} />
            )}
            {m.dashes?.map(([x, y]) => (
              <span key={`${x}-${y}`} className="absolute bg-white rounded-full" style={{ left: x - cx, top: y - cy, width: 50, height: 3 }} />
            ))}
            <Label
              at={mobile && m.mobileLabel ? m.mobileLabel : { left: m.label[0] - cx, top: m.label[1] - cy }}
              year={m.year}
              sub={m.sub}
              mobile={mobile}
            />
            {m.second && (
              <Label at={{ left: m.second.label[0] - cx, top: m.second.label[1] - cy }} year={m.second.year} mobile={mobile} />
            )}
          </div>
        </motion.div>
      )
    })}
  </div>
)

// Faint grid behind everything (desktop frame coordinates, cover-scaled to the viewport).
const GRID_BLOCKS = [
  [0, 0, 175, 31, "#101413"],
  [197, 89, 92, 94, "#0e1615"],
  [289, 0, 98, 89, "#070b0a"],
  [100, 473, 98, 93, "#0c0b0e"],
  [0, 473, 98, 93, "#051314"],
  [1296, 0, 97, 87, "#0e1211"],
]
const GRID_V_DARK = [479, 528, 626, 915, 1368]
const GRID_H_DASHED = [259, 379, 556, 565]
const GRID_V_LIGHT = [[202, 901], [752, 901], [1262, 901], [1563, 397], [1763, 220]]
const GRID_H_LIGHT = [[57, 1920], [347, 1739], [654, 1540]]
const GRID_SQUARES_X = [197, 748, 1259, 1560, 1760]
const GRID_SQUARES_Y = [55, 346, 656]

const Grid = () => (
  <>
    {GRID_BLOCKS.map(([x, y, w, h, c]) => (
      <span key={`b${x}-${y}`} className="absolute" style={{ left: x, top: y, width: w, height: h, background: c }} />
    ))}
    <span
      className="absolute"
      style={{ left: 975, top: 130, width: 508, height: 502, background: "linear-gradient(135deg, #0a0a09 0%, #001110 100%)" }}
    />
    <span className="absolute top-0 h-full w-0.5" style={{ left: 98, background: "#201010" }} />
    {GRID_V_DARK.map((x) => (
      <span key={`v${x}`} className="absolute top-0 h-full w-0.5" style={{ left: x, background: "linear-gradient(to bottom, #201010, rgba(32,16,16,0))" }} />
    ))}
    {GRID_H_DASHED.map((y) => (
      <span key={`h${y}`} className="absolute left-0 w-full border-t border-dashed border-[#2b2320]" style={{ top: y }} />
    ))}
    {[279, 686].map((y) => (
      <span key={`s${y}`} className="absolute left-0 w-full h-0.5" style={{ top: y, background: "#111916" }} />
    ))}
    {GRID_V_LIGHT.map(([x, h]) => (
      <span key={`l${x}`} className="absolute top-0 w-0.5" style={{ left: x, height: h, background: "linear-gradient(to bottom, rgba(217,217,217,0.2), rgba(115,115,115,0))" }} />
    ))}
    {GRID_H_LIGHT.map(([y, w]) => (
      <span key={`m${y}`} className="absolute left-0" style={{ top: y, width: w, height: 3, background: "linear-gradient(to right, rgba(217,217,217,0.2), rgba(115,115,115,0))" }} />
    ))}
    {GRID_SQUARES_X.map((x) =>
      GRID_SQUARES_Y.map((y) => (
        <span key={`q${x}-${y}`} className="absolute" style={{ left: x, top: y, width: 9, height: 8, background: "rgba(109,107,108,0.2)" }} />
      ))
    )}
  </>
)

const LoaderScreen = ({ introDone, ready }) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const { w: vw, h: vh } = useViewport()
  const frame = isDesktop ? DESKTOP : MOBILE

  // Content is scaled to the viewport width and hugs the top edge, so the path meets the top
  // of the screen on desktop and the right edge on phones; the grid covers the viewport.
  const contentScale = vw / frame.w
  const gridScale = Math.max(vw / DESKTOP.w, vh / DESKTOP.h)

  // Lock page scrolling while the screen is up (also during its exit fade).
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prev = [html.style.overflow, body.style.overflow]
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    return () => {
      html.style.overflow = prev[0]
      body.style.overflow = prev[1]
    }
  }, [])

  const holding = introDone && !ready
  const dot = (times) =>
    holding
      ? { animate: { opacity: [1, 0.2, 1] }, transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } }
      : { animate: { opacity: times.length === 3 ? [0, 1, 1] : [0, 0, 1, 1] }, transition: { duration: INTRO_S, times, ease: times.length === 3 ? ["easeOut", "linear"] : ["linear", "easeOut", "linear"] } }

  const loadingWord = (
    <>
      Loading
      <motion.span initial={{ opacity: 0 }} {...dot([0, 0.2869, 1])}>.</motion.span>
      <motion.span initial={{ opacity: 0 }} {...dot([0, 0.2869, 0.5738, 1])}>.</motion.span>
      <motion.span initial={{ opacity: 0 }} {...dot([0, 0.5738, 0.8433, 1])}>.</motion.span>
    </>
  )

  return (
    <motion.div
      className="fixed inset-0 z-[1000] overflow-hidden bg-[#0A0A0A] select-none"
      role="status"
      aria-label="Loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute origin-top-left pointer-events-none"
        style={{
          width: DESKTOP.w,
          height: DESKTOP.h,
          left: (vw - DESKTOP.w * gridScale) / 2,
          top: (vh - DESKTOP.h * gridScale) / 2,
          transform: `scale(${gridScale})`,
        }}
      >
        <Grid />
      </div>

      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: frame.w, height: frame.h, transform: `scale(${contentScale})` }}
      >
        <MapLayer mobile={!isDesktop} />

        <motion.div
          className="absolute -translate-x-1/2 font-bold text-white whitespace-nowrap leading-none tracking-[0.45px]"
          style={isDesktop ? { left: 625, top: 158, fontSize: 128 } : { left: 248, top: 212, fontSize: 64 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 1], scale: [0.8, 1, 1] }}
          transition={{
            duration: INTRO_S,
            times: [0, INTRO_END, 1],
            opacity: { ease: [[0.6, 0, 0.5, 0.9], "linear"] },
            scale: { ease: [[0.5, 0, 0.95, 0.6], "linear"] },
          }}
        >
          <span className="text-[#FF0033]">F</span>UIUX
        </motion.div>

      </div>

      {/* "Loading..." sits in the bottom-right corner of the screen itself (Figma offsets). */}
      <div
        className="absolute font-black text-[#FF0033] whitespace-nowrap leading-none"
        style={
          isDesktop
            ? { right: 151 * contentScale, bottom: 10 * contentScale, fontSize: 40 * contentScale }
            : { right: 25 * contentScale, bottom: 15 * contentScale, fontSize: 24 * contentScale }
        }
      >
        {loadingWord}
      </div>

      <motion.div
        className="absolute left-0 bottom-0 h-0.5 bg-[#FF0033]"
        initial={{ width: 0 }}
        animate={{ width: ["0%", "100%", "100%"] }}
        transition={{ duration: INTRO_S, times: [0, INTRO_END, 1], ease: ["easeOut", "linear"] }}
      />
    </motion.div>
  )
}

const Loading = () => {
  const [introDone, setIntroDone] = useState(false)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), INTRO_S * INTRO_END * 1000 + 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let alive = true
    const timeout = new Promise((resolve) => setTimeout(resolve, ASSET_TIMEOUT_MS))
    Promise.race([whenAssetsReady(), timeout]).then(() => {
      if (alive) setReady(true)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!(introDone && ready)) return
    const t = setTimeout(() => setVisible(false), 250)
    return () => clearTimeout(t)
  }, [introDone, ready])

  return <AnimatePresence>{visible && <LoaderScreen introDone={introDone} ready={ready} />}</AnimatePresence>
}

export default Loading
