import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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

  const sectionScale = useTransform(scrollYProgress, [0, 0.18, 0.35, 1], [0.85, 0.85, 1, 1])
  const sectionY = useTransform(scrollYProgress, [0, 0.18, 0.35, 1], [220, 220, 0, 0])
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.12, 0.28, 1], [1, 1, 1, 1])

  const cardsOpacity = useTransform(scrollYProgress, [0.55, 0.72, 0.88], [1, 0.35, 0])
  const cardsX = useTransform(scrollYProgress, [0.55, 0.8], [0, 80])

  const imageScale = useTransform(scrollYProgress, [0.55, 0.72, 0.9, 1], [1, 1.8, 4.5, 9])
  const imageX = useTransform(scrollYProgress, [0.55, 0.72, 0.9, 1], [0, 80, 180, 560])
  const imageY = useTransform(scrollYProgress, [0.55, 0.72, 0.9, 1], [0, -40, -120, -220])
  const imageOpacity = useTransform(scrollYProgress, [0.55, 0.78, 0.92, 1], [1, 1, 0.4, 0])

  return (
    <div ref={containerRef} className="h-[600vh] relative" id="tools">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A] z-20">
        <motion.div
          className="relative w-full h-full"
          style={{ scale: sectionScale, y: sectionY, opacity: sectionOpacity }}
        >
          <motion.img
            src={background}
            alt="tools background"
            className="absolute top-0 left-0 w-[70%] h-auto origin-center pointer-events-none"
            style={{
              scale: imageScale,
              x: imageX,
              y: imageY,
              opacity: imageOpacity
            }}
          />
          <div className="relative w-full flex container flex-col gap-6.25 pt-20 pb-30 h-full">
            <Header header="Tools & Proficiency" />
            <motion.div
              className="grid grid-cols-3 gap-5 ml-auto"
              style={{ opacity: cardsOpacity, x: cardsX }}
            >
              <ToolCard size="55.75" icon={<FigmaTool />} text="Figma" percentage={98} />
              <ToolCard size="55.75" icon={<ClaudeTool />} text="Claude" percentage={90} />
              <ToolCard size="55.75" isBlanc={true} />
              <ToolCard size="55.75" icon={<IllustratorTool />} text="Illustrator" percentage={93} />
              <ToolCard size="55.75" icon={<InvisionTool />} text="Invision" percentage={85} />
              <ToolCard size="55.75" icon={<PhotoshopTool />} text="Photoshop" percentage={88} />
              <ToolCard size="55.75" isBlanc={true} />
              <ToolCard size="55.75" icon={<BlenderTool />} text="Blender" percentage={80} />
              <ToolCard size="55.75" icon={<SketchTool />} text="Sketch" percentage={95} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
export default ToolsSection