/* eslint-disable react-hooks/set-state-in-effect */
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, easeIn, easeInOut } from "framer-motion"
import Header from "../ui/Header"
import background from "../assets/images/toolsBg.png"
import background2 from "../assets/images/toolsBg2.png"
import ToolCard from "../ui/ToolCard"
import FigmaTool from "../assets/svgs/FigmaTool.jsx"
import ClaudeTool from "../assets/svgs/ClaudeTool.jsx"
import IllustratorTool from "../assets/svgs/IllustratorTool.jsx"
import InvisionTool from "../assets/svgs/InvisionTool.jsx"
import PhotoshopTool from "../assets/svgs/PhotoshopTool.jsx"
import BlenderTool from "../assets/svgs/BlenderTool.jsx"
import SketchTool from "../assets/svgs/SketchTool.jsx"

const MOBILE_QUERY = "(max-width: 1023px)"

// Scroll progress is run through a spring so the image glides instead of tracking the
// wheel step by step. Kept fairly stiff so it never lags far behind the real scroll.
const SCROLL_SPRING = { stiffness: 170, damping: 32, mass: 0.4, restDelta: 0.0005 }

// Where the glowing ring sits inside each image (fractions of the image box), measured from
// the pixels. The zoom is anchored on this point so the viewer flies into the ring.
const RING_DESKTOP = { x: 0.394, y: 0.53, diameter: 0.383 }
const RING_MOBILE = { x: 0.501, y: 0.649, diameter: 0.485 }
// Inner edge of the ring band relative to its outer glow, and safety margin past the corners.
const RING_INNER_RATIO = 0.85
const EXIT_MARGIN = 1.1
// Mobile: extra screens of scroll during which the stage stays pinned.
const MOBILE_EXTRA_SCREENS = 1.2

// Timelines (fractions of each stage). Everything finishes before the stage releases, so a
// lagging spring can never leave the image mid-zoom when the next section scrolls in.
const DESKTOP_TL = { cards: [0.42, 0.52], glide: [0.5, 0.7], zoom: [0.7, 0.88], fade: [0.84, 0.95] }
const MOBILE_TL = { cards: [0, 0.3], glide: [0, 0.45], zoom: [0.45, 0.82], fade: [0.78, 0.9] }

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const clamp01 = (v) => Math.min(1, Math.max(0, v))
/** Eased 0..1 progress of `p` across the segment [a, b]. */
const seg = (p, [a, b], ease) => ease(clamp01((p - a) / (b - a)))

/** Scale at which the ring's inner edge is outside every corner of the viewport. */
const exitScale = (ringDiameterPx, vw, vh) => {
  const halfDiagonal = Math.hypot(vw, vh) / 2
  const innerRadius = (ringDiameterPx / 2) * RING_INNER_RATIO
  return Math.max(4, (halfDiagonal * EXIT_MARGIN) / Math.max(innerRadius, 1))
}

/** Scale / translate / opacity motion values for the ring fly-in, driven by `value` 0..1. */
const useRingZoom = (value, tl, metrics) => {
  const scale = useTransform(value, (p) => {
    const { finalScale } = metrics.current
    return 1 + seg(p, tl.glide, easeInOut) + seg(p, tl.zoom, easeIn) * (finalScale - 2)
  })
  const x = useTransform(value, (p) => metrics.current.dx * seg(p, tl.glide, easeInOut))
  const y = useTransform(value, (p) => metrics.current.dy * seg(p, tl.glide, easeInOut))
  const opacity = useTransform(value, tl.fade, [1, 0])
  return { scale, x, y, opacity }
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return isMobile
}

const tools = [
  { icon: <FigmaTool />, text: "Figma", percentage: 98 },
  { icon: <ClaudeTool />, text: "Claude", percentage: 90 },
  { isBlanc: true },
  { icon: <IllustratorTool />, text: "Illustrator", percentage: 93 },
  { icon: <InvisionTool />, text: "Invision", percentage: 85 },
  { icon: <PhotoshopTool />, text: "Photoshop", percentage: 88 },
  { isBlanc: true },
  { icon: <BlenderTool />, text: "Blender", percentage: 80 },
  { icon: <SketchTool />, text: "Sketch", percentage: 95 }
]

/**
 * Phones / tablets: the section scrolls normally until its bottom meets the bottom of the
 * screen. It then pins for a bit more than one screen of scrolling while the cards fade out
 * and the ring in the background image is brought to the middle of the screen, blown up
 * until the viewer is inside it, and faded away. The next section then scrolls in.
 */
const ToolsMobile = () => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)
  const [stickyTop, setStickyTop] = useState(0)
  const metrics = useRef({ start: 0, dx: 0, dy: 0, finalScale: 6 })

  useEffect(() => {
    const update = () => {
      const content = contentRef.current?.offsetHeight || 1
      const vw = window.innerWidth
      const vh = window.innerHeight
      const w = imageRef.current?.offsetWidth || vw
      const h = imageRef.current?.offsetHeight || 0
      // While pinned the image's bottom edge sits on the viewport bottom.
      const ringX = w * RING_MOBILE.x
      const ringY = vh - h + h * RING_MOBILE.y
      metrics.current = {
        // scroll progress at which the content bottom reaches the viewport bottom
        start: content / (content + vh * MOBILE_EXTRA_SCREENS),
        dx: vw / 2 - ringX,
        dy: vh / 2 - ringY,
        finalScale: exitScale(w * RING_MOBILE.diameter, vw, vh),
      }
      // sticky offset that pins the content when its bottom edge reaches the viewport bottom
      // (negative when the content is taller than the screen)
      setStickyTop(vh - content)
    }
    update()
    const observer = new ResizeObserver(update)
    if (contentRef.current) observer.observe(contentRef.current)
    window.addEventListener("resize", update)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })
  const progress = useSpring(scrollYProgress, SCROLL_SPRING)

  // 0 when the content bottom reaches the viewport bottom, 1 at the end of the extra room
  const effect = useTransform(progress, (p) => {
    const { start } = metrics.current
    return clamp01((p - start) / (1 - start))
  })

  const image = useRingZoom(effect, MOBILE_TL, metrics)
  const contentOpacity = useTransform(effect, MOBILE_TL.cards, [1, 0])
  const contentY = useTransform(effect, MOBILE_TL.cards, [0, -24])

  return (
    <div
      ref={containerRef}
      id="tools"
      className="relative z-20 w-full bg-[#0A0A0A] overflow-x-clip"
    >
      {/* overflow-hidden keeps the blown-up image inside the pinned box so nothing of it can
          show over the next section once the stage releases */}
      <div
        ref={contentRef}
        className="sticky w-full bg-[#0A0A0A] flex flex-col overflow-hidden"
        style={{ top: stickyTop }}
      >
        <motion.div
          className="relative z-2 w-full flex container flex-col gap-6.25 px-5 pt-24 pb-10"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Header header="Tools & Proficiency" />
          </motion.div>
          <motion.div
            className="grid grid-cols-3 gap-2.5 w-full ml-auto"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {tools.map((tool, i) => (
              <motion.div key={i} variants={itemVariants}>
                <ToolCard size="223" {...tool} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="relative z-1 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.img
            ref={imageRef}
            src={background2}
            alt="tools background"
            className="block w-full h-auto pointer-events-none will-change-transform"
            style={{
              scale: image.scale,
              x: image.x,
              y: image.y,
              opacity: image.opacity,
              transformOrigin: `${RING_MOBILE.x * 100}% ${RING_MOBILE.y * 100}%`
            }}
          />
        </motion.div>
      </div>
      {/* Extra scroll during which the content above stays pinned. It must be real content
          (not padding): a sticky child can only move inside the parent's content box. */}
      <div aria-hidden="true" style={{ height: `${MOBILE_EXTRA_SCREENS * 100}vh` }} />
    </div>
  )
}

/**
 * Desktop: sticky stage. The cards slide out, the ring in the image glides to the middle of
 * the screen, then the image keeps growing until the ring is outside the screen and the
 * viewer is "inside" it, and fades away. The next section then scrolls in.
 */
const ToolsDesktop = () => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const metrics = useRef({ dx: 0, dy: 0, finalScale: 6 })

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const w = imageRef.current?.offsetWidth || vw * 0.6
      const h = imageRef.current?.offsetHeight || 0
      // Untransformed layout: image at the left edge, vertically centred in the viewport.
      const ringX = w * RING_DESKTOP.x
      const ringY = vh / 2 - h / 2 + h * RING_DESKTOP.y
      metrics.current = {
        dx: vw / 2 - ringX,
        dy: vh / 2 - ringY,
        finalScale: exitScale(w * RING_DESKTOP.diameter, vw, vh),
      }
    }
    update()
    const observer = new ResizeObserver(update)
    if (imageRef.current) observer.observe(imageRef.current)
    window.addEventListener("resize", update)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  const progress = useSpring(scrollYProgress, SCROLL_SPRING)

  const [cardsHidden, setCardsHidden] = useState(false)
  useMotionValueEvent(progress, "change", (latest) => {
    setCardsHidden(latest >= DESKTOP_TL.cards[1])
  })

  const cardsOpacity = useTransform(progress, DESKTOP_TL.cards, [1, 0])
  const cardsX = useTransform(progress, DESKTOP_TL.cards, [0, 40])
  const image = useRingZoom(progress, DESKTOP_TL, metrics)

  return (
    <div ref={containerRef} className="h-[350vh] relative z-20" id="tools" style={{ marginTop: "-100vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">
        <div className="relative w-full h-full">
          <motion.img
            ref={imageRef}
            src={background}
            alt="tools background"
            className="absolute top-1/2 left-0 w-[60%] h-auto pointer-events-none z-1 -translate-y-1/2 will-change-transform"
            style={{
              scale: image.scale,
              x: image.x,
              y: image.y,
              opacity: image.opacity,
              transformOrigin: `${RING_DESKTOP.x * 100}% ${RING_DESKTOP.y * 100}%`
            }}
          />
          <div className="relative w-full flex container flex-col gap-6.25 pt-30 pb-30 h-full z-2">
            <Header header="Tools & Proficiency" />
            <motion.div
              className="grid grid-cols-3 gap-5 w-177.25 ml-auto"
              style={{
                opacity: cardsOpacity,
                x: cardsX,
                pointerEvents: cardsHidden ? "none" : "auto",
                visibility: cardsHidden ? "hidden" : "visible"
              }}
            >
              {tools.map((tool, i) => (
                <ToolCard key={i} size="223" {...tool} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ToolsSection = () => {
  const isMobile = useIsMobile()
  return isMobile ? <ToolsMobile /> : <ToolsDesktop />
}

export default ToolsSection
