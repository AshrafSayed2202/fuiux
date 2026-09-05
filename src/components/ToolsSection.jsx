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
  return (
    <div className="bg-[#0A0A0A] relative min-h-screen overflow-hidden!">
        <img src={background} alt="tools background" className="absolute top-0 left-0 w-[70%] h-auto" />
      <div className="relative w-full flex container flex-col gap-6.25 pt-20 pb-30">
        <Header header="Tools & Proficiency" />
        <div className="grid grid-cols-3 gap-5 ml-auto">
          <ToolCard size="55.75" icon={<FigmaTool />} text="Figma" percentage={98} />
          <ToolCard size="55.75" icon={<ClaudeTool />} text="Claude" percentage={90} />
          <ToolCard size="55.75" isBlanc={true} />
          <ToolCard size="55.75" icon={<IllustratorTool />} text="Illustrator" percentage={93} />
          <ToolCard size="55.75" icon={<InvisionTool />} text="Invision" percentage={85} />
          <ToolCard size="55.75" icon={<PhotoshopTool />} text="Photoshop" percentage={88} />
          <ToolCard size="55.75" isBlanc={true} />
          <ToolCard size="55.75" icon={<BlenderTool />} text="Blender" percentage={80} />
          <ToolCard size="55.75" icon={<SketchTool />} text="Sketch" percentage={95} />
        </div>
      </div>
    </div>
  )
}
export default ToolsSection