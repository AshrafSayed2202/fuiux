/* eslint-disable react-hooks/set-state-in-effect */
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
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

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
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

const ToolsSection = () => {
  const isMobile = useIsMobile()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const [cardsHidden, setCardsHidden] = useState(false)
  const cardsHiddenRef = useRef(false)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const shouldHide = latest >= 0.595
    if (shouldHide !== cardsHiddenRef.current) {
      cardsHiddenRef.current = shouldHide
      setCardsHidden(shouldHide)
    }
  })

  const cardsOpacity = useTransform(scrollYProgress, [0.55, 0.595], [1, 0])
  const cardsX = useTransform(scrollYProgress, [0.55, 0.595], [0, 40])

  const imageScale = useTransform(scrollYProgress, [0.55, 0.7, 0.85, 1], [1, 2.2, 5, 8])
  const imageX = useTransform(scrollYProgress, [0.55, 0.7, 0.85, 1], [0, 350, 1000, 1000])
  const imageY = useTransform(scrollYProgress, [0.55, 0.7, 0.85, 1], [0, -30, -80, -140])
  const imageOpacity = useTransform(scrollYProgress, [0.55, 0.75, 0.95, 1], [1, 1, 0.6, 0])

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

    if (isMobile) {
    return (
      <div
        ref={containerRef}
        id="tools"
        className="relative z-20 w-full overflow-hidden bg-[#0A0A0A] flex flex-col"
      >
        <div className="relative z-2 w-full flex container flex-col gap-6.25 px-5 pt-24 pb-10">
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
        </div>
        <motion.img
          src={background2}
          alt="tools background"
          className="relative block h-auto pointer-events-none z-1"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="h-[350vh] relative z-20" id="tools" style={{ marginTop: "-100vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">
        <motion.div className="relative w-full h-full">
          <motion.img
            src={background}
            alt="tools background"
            className="absolute top-1/2 left-0 w-[60%] h-auto origin-center pointer-events-none z-1 -translate-y-1/2"
            style={{
              scale: imageScale,
              x: imageX,
              y: imageY,
              opacity: imageOpacity
            }}
          />
          <div className="relative w-full flex container flex-col gap-6.25 pt-30 pb-30 h-full z-2">
            <Header header="Tools & Proficiency" />
            <motion.div
              className="grid grid-cols-3 gap-5 w-177.25 ml-auto"
              style={{
                opacity: cardsHidden ? 0 : cardsOpacity,
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
        </motion.div>
      </div>
    </div>
  )
}
export default ToolsSection