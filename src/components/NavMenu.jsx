import footerBg1 from "../assets/images/footerBg1.png";
import footerBg2 from "../assets/images/footerBg2.png";
import footerBg3 from "../assets/images/footerBg3.png";
import LinkHoverFooter from "../assets/svgs/LinkHoverFooter";
import { useScrambleText } from "../hooks/useScrambleText";
import hoverSound from "../assets/sounds/hover.wav";
import clickSound from "../assets/sounds/click.wav";
import RedRoadMap from "../assets/svgs/RedRoadMap";
import Character from "../assets/images/charcter-2.png";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const NavMenuItem = ({ title, link, onClose }) => {
  const { start, stop, click } = useScrambleText(title, {
    hoverSound,
    clickSound,
    volume: 0.45,
  });

  const handleClick = () => {
    click();
    onClose?.();
  };

  return (
    <motion.div
      variants={itemVariants}
      className="w-full flex items-center justify-center text-2xl lg:text-3xl px-6 py-3 lg:py-4 text-center relative"
    >
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
    </motion.div>
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
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
      <motion.img
        src={footerBg1}
        alt=""
        className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.img
        src={footerBg2}
        alt=""
        className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
      />
      <motion.img
        src={footerBg3}
        alt=""
        className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />

      <div className="relative w-full h-full gap-6.25 pt-20 pb-15">
        <div className="h-full relative z-2">
          <motion.div
            className="w-full lg:w-1/3 flex flex-col h-full gap-2 lg:gap-4 items-center justify-center lg:justify-end pb-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navs.map((nav, index) => (
              <NavMenuItem
                key={index}
                title={nav.title}
                link={nav.link}
                onClose={onClose}
              />
            ))}
          </motion.div>
        </div>
        <motion.div
          className="absolute top-0 user-select-none pointer-events-none z-1 hidden lg:block"
          initial={{ opacity: 0, x: -80 ,rotateY:180 }}
          animate={{ opacity: 1, x: 0 ,rotateY:180 }}
          transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
        >
          <RedRoadMap />
        </motion.div>
        <motion.img
          src={Character}
          alt=""
          className="absolute bottom-0 right-0 translate-x-1/5 h-full w-full object-cover pointer-events-none z-2 hidden lg:block"
          initial={{ opacity: 1, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 1.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default NavMenu;