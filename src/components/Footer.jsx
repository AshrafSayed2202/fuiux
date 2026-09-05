import footerBg1 from "../assets/images/footerBg1.png";
import footerBg2 from "../assets/images/footerBg2.png";
import footerBg3 from "../assets/images/footerBg3.png";
import BehanceVec from "../assets/svgs/BehanceVec";
import DribbleVec from "../assets/svgs/DribbleVec";
import FigmaTool from "../assets/svgs/FigmaTool";
import InstagramVec from "../assets/svgs/InstagramVec";
import LinkedInVec from "../assets/svgs/LinkedInVec";
import MailVec from "../assets/svgs/MailVec";
import YouTubeVec from "../assets/svgs/YouTubeVec";
import ToolCard from "../ui/ToolCard";
const Footer = () => {
  return (
    <div className="bg-[#0A0A0A] relative min-h-screen overflow-hidden!">
      <img src={footerBg1} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <img src={footerBg2} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <img src={footerBg3} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <div>
        <div></div>
        <div>
          <div className="grid grid-cols-4 gap-6 min-w-272 absolute top-[-6%] right-[-19.5%] rotate-45">
            <ToolCard size="63.5" icon={""} text="" percentage={0} />
            <ToolCard size="63.5" icon={""} text="" percentage={0} />
            <ToolCard size="63.5" icon={""} text="" percentage={0} />
            <ToolCard size="63.5" icon={""} text="" percentage={0} />
            <ToolCard size="63.5" icon={<YouTubeVec />} text="youtube" percentage={0} />
            <ToolCard size="63.5" icon={<BehanceVec />} text="behance" percentage={0} />
            <ToolCard size="63.5" icon={""} text="" percentage={0} />
            <ToolCard size="63.5" icon={""} text="" percentage={0} />
            <ToolCard size="63.5" icon={<FigmaTool />} text="Figma" percentage={0} />
            <ToolCard size="63.5" icon={<LinkedInVec />} text="linkedin" percentage={0} />
            <ToolCard size="63.5" icon={<DribbleVec />} text="dribbble" percentage={0} />
            <ToolCard size="63.5" icon={""} text="" percentage={0} />
            <ToolCard size="63.5" icon={<MailVec />} text="Info@fuiux.com" percentage={0} />
            <ToolCard size="63.5" icon={<InstagramVec />} text="instagram" percentage={0} />
            <ToolCard size="63.5" icon={""} text="" percentage={0} />
            <ToolCard size="63.5" icon={""} text="" percentage={0} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer