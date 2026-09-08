import footerBg1 from "../assets/images/footerBg1.png";
import footerBg2 from "../assets/images/footerBg2.png";
import footerBg3 from "../assets/images/footerBg3.png";
import BehanceVec from "../assets/svgs/BehanceVec";
import DribbleVec from "../assets/svgs/DribbleVec";
import FigmaTool from "../assets/svgs/FigmaTool";
import InstagramVec from "../assets/svgs/InstagramVec";
import LinkedInVec from "../assets/svgs/LinkedInVec";
import LinkHoverFooter from "../assets/svgs/LinkHoverFooter";
import LogoFooter from "../assets/svgs/LogoFooter";
import MailVec from "../assets/svgs/MailVec";
import YouTubeVec from "../assets/svgs/YouTubeVec";
import ToolCard from "../ui/ToolCard";
const Footer = () => {
  const navs = [
    { title: "HOME", link: "#home" },
    { title: "ABOUT ME", link: "#about" },
    { title: "TOOLS", link: "#tools" },
    { title: "WORK", link: "#work" },
    { title: "PRICING", link: "#pricing" },
    { title: "TESTIMONIALS", link: "#testimonials" },
    { title: "CONTACT ME", link: "#contact" }
  ]
  return (
    <div className="bg-[#0A0A0A] relative h-screen overflow-hidden!">
      <img src={footerBg1} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <img src={footerBg2} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <img src={footerBg3} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <div className="relative w-full h-full gap-6.25 pt-20 pb-15">
        <div className="h-full">
          <div className="grid grid-cols-4 gap-6 absolute top-[-6%] right-[-19.5%] rotate-45 min-w-272">
            <h1 className="text-[65px] left-0 translate-y-[-270%] bottom-0 translate-x-[-56%]  absolute -rotate-90 text-white opacity-80 font-bold uppercase">
              info<span className="text-[#FF0033]">@</span>fuiux.com
            </h1>
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
          <div className="w-1/2 flex flex-col h-full gap-4 items-center justify-end pb-7">
            <div className="mb-5 group">
              <LogoFooter />
            </div>
            {navs.map((nav, index) => (
              <div className="w-full flex items-center justify-center text-3xl px-6 py-4 text-center relative group" key={index}>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 duration-300">
                  <LinkHoverFooter />
                </div>
                <a href={nav.link} className="text-white font-extrabold uppercase w-64.25 h-10 duration-300">
                  {nav.title}
                </a>
              </div>
            ))}

          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-screen! h-15 backdrop-blur-[50px] bg-white/2 border-t border-white/5">
          <div className="container flex items-center h-full justify-between text-white text-base font-extrabold">
            <div><span className="text-[#FF0033]">F</span>UIUX<span className="text-gray-500 text-xl">&copy;</span> {new Date().getFullYear()}.All Rights Reserved</div>
            <div className="flex items-center gap-6">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer