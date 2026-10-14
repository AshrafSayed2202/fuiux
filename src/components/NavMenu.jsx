import footerBg1 from "../assets/images/footerBg1.png";
import footerBg2 from "../assets/images/footerBg2.png";
import footerBg3 from "../assets/images/footerBg3.png";
import LinkHoverFooter from "../assets/svgs/LinkHoverFooter";
import { useScrambleText } from "../hooks/useScrambleText";
import hoverSound from "../assets/sounds/hover.wav";
import clickSound from "../assets/sounds/click.wav";

const NavMenuItem = ({ title, link, onClose }) => {
  const { start, stop, click } = useScrambleText(title, {
    hoverSound,
    clickSound,
    volume: 0.45,
  });

  const handleClick = () => {
    click();
    onClose?.(); // immediately reset parent menu state
  };

  return (
    <div className="w-full flex items-center justify-center text-3xl px-6 py-4 text-center relative">
      <a
        href={link}
        onMouseEnter={start}
        onMouseLeave={stop}
        onClick={handleClick}
        className="text-white font-extrabold uppercase w-64.25 h-10 duration-300 group"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 duration-300">
          <LinkHoverFooter />
        </div>
        {title}
      </a>
    </div>
  );
};

const NavMenu = ({ onClose }) => {
  const navs = [
    { title: "HOME", link: "#home" },
    { title: "ABOUT ME", link: "#about" },
    { title: "TOOLS", link: "#tools" },
    { title: "WORK", link: "#work" },
    { title: "PRICING", link: "#pricing" },
    { title: "TESTIMONIALS", link: "#testimonials" },
    { title: "CONTACT ME", link: "#contact" },
  ];

  return (
    <div className="bg-[#0A0A0A] relative h-screen w-screen overflow-hidden">
      <img src={footerBg1} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <img src={footerBg2} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />
      <img src={footerBg3} alt="" className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />

      <div className="relative w-full h-full gap-6.25 pt-20 pb-15">
        <div className="h-full">
          <div className="w-1/3 flex flex-col h-full gap-4 items-center justify-end pb-7">
            {navs.map((nav, index) => (
              <NavMenuItem
                key={index}
                title={nav.title}
                link={nav.link}
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;