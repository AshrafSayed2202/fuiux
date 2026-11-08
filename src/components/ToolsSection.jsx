import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import Header from "../ui/Header"
import background from "../assets/images/toolsBg.png"
import ToolCard from "../ui/ToolCard"
import FigmaTool from "../assets/svgs/FigmaTool.jsx"
import ClaudeTool from "../assets/svgs/ClaudeTool.jsx"
import IllustratorTool from "../assets/svgs/IllustratorTool.jsx"
import InvisionTool from "../assets/svgs/InvisionTool.jsx"
import PhotoshopTool from "../assets/svgs/PhotoshopTool.jsx"
import BlenderTool from "../assets/svgs/BlenderTool.jsx"
import SketchTool from "../assets/svgs/SketchTool.jsx"

const ToolsSection = () => {
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
  const imageX = useTransform(scrollYProgress, [0.55, 0.7, 0.85, 1], [0, 350, 1000, 1000 ])
  const imageY = useTransform(scrollYProgress, [0.55, 0.7, 0.85, 1], [0, -30, -80, -140])
  const imageOpacity = useTransform(scrollYProgress, [0.55, 0.75, 0.95, 1], [1, 1, 0.6, 0])

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
              className="grid grid-cols-3 gap-5 ml-auto"
              style={{
                opacity: cardsHidden ? 0 : cardsOpacity,
                x: cardsX,
                pointerEvents: cardsHidden ? "none" : "auto",
                visibility: cardsHidden ? "hidden" : "visible"
              }}
            >
              <ToolCard size="223" icon={<FigmaTool />} text="Figma" percentage={98} />
              <ToolCard size="223" icon={<ClaudeTool />} text="Claude" percentage={90} />
              <ToolCard size="223" isBlanc={true} />
              <ToolCard size="223" icon={<IllustratorTool />} text="Illustrator" percentage={93} />
              <ToolCard size="223" icon={<InvisionTool />} text="Invision" percentage={85} />
              <ToolCard size="223" icon={<PhotoshopTool />} text="Photoshop" percentage={88} />
              <ToolCard size="223" isBlanc={true} />
              <ToolCard size="223" icon={<BlenderTool />} text="Blender" percentage={80} />
              <ToolCard size="223" icon={<SketchTool />} text="Sketch" percentage={95} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
export default ToolsSection