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
import { useScrambleText } from "../hooks/useScrambleText";
import hoverSound from "../assets/sounds/hover.wav";
import clickSound from "../assets/sounds/click.wav";

const FooterNavItem = ({ title, link }) => {
  const { start, stop, click } = useScrambleText(title, {
    hoverSound,
    clickSound,
    volume: 0.45,
  });

  return (
    <div className="w-full flex items-center justify-center text-[17px] lg:text-3xl px-6 py-2 lg:py-4 text-center relative">
      <a
        href={link}
        onMouseEnter={start}
        onMouseLeave={stop}
        onClick={click}
        className="text-white font-extrabold uppercase w-full lg:w-64.25 h-7 lg:h-10 duration-800 ease-out group"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.55] lg:scale-100 pointer-events-none opacity-0 group-hover:opacity-100 duration-800 ease-out">
          <LinkHoverFooter />
        </div>
        {title}
      </a>
    </div>
  );
};

const Footer = ({ overlay = true }) => {
  const navs = [
    { title: "HOME", link: "/#home" },
    { title: "ABOUT ME", link: "/#about" },
    { title: "TOOLS", link: "/#tools" },
    { title: "WORK", link: "/#work" },
    { title: "PRICING", link: "/#pricing" },
    { title: "TESTIMONIALS", link: "/#testimonials" },
    { title: "CONTACT ME", link: "/#contact" }
  ]
  return (
    <div className={`bg-[#0A0A0A] relative min-h-screen lg:h-screen overflow-hidden! z-20 ${overlay ? "lg:mt-[-100vh]" : ""}`}>
      <img src={footerBg1} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <img src={footerBg2} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <img src={footerBg3} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <div className="relative w-full min-h-screen lg:min-h-0 lg:h-full flex flex-col lg:block gap-6.25 pt-16 lg:pt-20 pb-0 lg:pb-15">
        <div className="flex flex-col lg:block lg:h-full">
          <div className="w-full lg:w-1/2 flex flex-col lg:h-full gap-0 lg:gap-4 items-center lg:justify-end pb-2 lg:pb-7">
            <div className="mb-3 lg:mb-5 group [&>svg]:h-20 [&>svg]:w-auto lg:[&>svg]:h-auto lg:[&>svg]:w-auto">
              <LogoFooter />
            </div>
            {navs.map((nav, index) => (
              <FooterNavItem key={index} title={nav.title} link={nav.link} />
            ))}
          </div>

          <div className="relative mt-4 h-[95vw] max-h-130 overflow-hidden lg:contents">
            <div className="grid grid-cols-4 absolute rotate-45 w-screen gap-[2vw] lg:w-auto lg:min-w-272 lg:gap-6 left-auto top-[10%] lg:top-[-6%] right-[-35%] lg:right-[-19.5%] lg:translate-x-0 lg:translate-y-0">
              <h1 className="text-[8.2vw] lg:text-[65px] left-0 translate-y-[-270%] bottom-0 translate-x-[-56%] absolute -rotate-90 text-white opacity-80 font-bold uppercase whitespace-nowrap">
                info<span className="text-[#FF0033]">@</span>fuiux.com
              </h1>
              <ToolCard size="254" bigDot={true} icon={""} text="" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={""} text="" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={""} text="" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={""} text="" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={<YouTubeVec />} text="youtube" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={<BehanceVec />} text="behance" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={""} text="" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={""} text="" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={<FigmaTool />} text="Figma" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={<LinkedInVec />} text="linkedin" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={<DribbleVec />} text="dribbble" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={""} text="" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={<MailVec />} text="Info@fuiux.com" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={<InstagramVec />} text="instagram" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={""} text="" percentage={0} />
              <ToolCard size="254" bigDot={true} icon={""} text="" percentage={0} />
            </div>
          </div>
        </div>
        <div className="relative lg:absolute mt-auto lg:mt-0 bottom-0 left-0 w-full lg:w-screen! h-auto lg:h-15 backdrop-blur-[50px] bg-white/2 border-t border-white/5">
          <div className="container flex flex-col lg:flex-row items-center h-full justify-center lg:justify-between gap-2 lg:gap-0 py-4 lg:py-0 px-5 lg:px-0 text-white text-[11px] lg:text-base font-extrabold">
            <div><span className="text-[#FF0033]">F</span>UIUX<span className="text-gray-500 text-base lg:text-xl">&copy;</span> {new Date().getFullYear()}.All Rights Reserved</div>
            <div className="flex items-center gap-4 lg:gap-6">
              <span className="hover:text-[#FF0033] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#FF0033] cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer