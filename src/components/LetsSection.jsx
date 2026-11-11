import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "../ui/Header";
import LetsChar1 from "../assets/images/letsChar1.png";
import LetsChar2 from "../assets/images/letsChar2.png";
import LetsBg1 from "../assets/images/LetsBg1.png";
import LetsBg2 from "../assets/images/LetsBg2.png";
import LetsBtn from "../assets/svgs/LetsBtn";
import { useScrambleText } from "../hooks/useScrambleText";
import hoverSound from "../assets/sounds/hover.wav";
import clickSound from "../assets/sounds/click.wav";
import ContactModal from "../components/ContactModal";

// Footer slide-over (all breakpoints): the section pins with its bottom edge on the viewport
// bottom while the footer, pulled up by 100vh, slides over it. The container is sized to the
// section height plus a pause plus one viewport of overlap travel.
const FOOTER_OVERLAP_PAUSE = 300;

const LetsSection = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const stageRef = useRef(null);
  const [stage, setStage] = useState({ height: undefined, top: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      const h = el.offsetHeight;
      const vh = window.innerHeight;
      setStage({ height: h + vh + FOOTER_OVERLAP_PAUSE, top: Math.min(0, vh - h) });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const { text, start, stop, click } = useScrambleText("Get in touch", {
    hoverSound,
    clickSound,
    volume: 0.45,
  });

  const handleClick = () => {
    click();
    setContactOpen(true);
  };

  return (
    <>
      <div className="relative" id="contact" style={{ height: stage.height }}>
        <div
          ref={stageRef}
          className="sticky min-h-screen lg:h-screen z-10 bg-[#0A0A0A] overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-center"
          style={{ top: stage.top }}
        >
          <img
            src={LetsBg1}
            alt="lets-bg-1"
            className="absolute top-1/2 left-1/2 object-cover translate-x-[-50%] translate-y-[-50%]"
          />
          <img
            src={LetsBg2}
            alt="lets-bg-2"
            className="absolute top-1/2 left-1/2 object-cover translate-x-[-50%] translate-y-[-50%]"
          />

          <div className="order-2 lg:order-0 relative mt-auto h-[105vw] max-h-140 w-full lg:contents">
            <img
              src={LetsChar1}
              alt="lets-char-1"
              className="absolute bottom-0 right-0 h-full w-auto max-w-[50%] lg:max-w-full object-cover object-left lg:object-center"
            />
            <img
              src={LetsChar2}
              alt="lets-char-2"
              className="absolute bottom-0 left-0 h-full w-auto max-w-[50%] lg:max-w-full object-cover object-right lg:object-center"
            />
          </div>

          <div className="order-1 lg:order-0 relative z-10 w-full flex container flex-col gap-6 lg:gap-14 px-5 lg:px-0 pt-24 lg:pt-20 pb-10 lg:pb-30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Header header="Let's collaborate" centered={true} Line={false} />
            </motion.div>
            <motion.h1
              className="text-[38px] sm:text-6xl lg:text-[80px] font-extrabold text-white text-center leading-[100%] tracking-[-0.8px] lg:tracking-[-1.6px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              Have a project in
              <span className="neon-text"> mind? </span>
            </motion.h1>
            <motion.p
              className="text-white/40 text-[12px] lg:text-base font-normal leading-5 lg:leading-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              I'm open to freelance projects, full-time roles, and long-term{" "}
              <br className="hidden lg:block" /> partnerships. Let's make something great together.
            </motion.p>

            <motion.div
              className="h-14.5 w-62.25 relative group overflow-hidden cursor-pointer m-auto"
              onMouseEnter={start}
              onMouseLeave={stop}
              onClick={handleClick}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <div className="text-white uppercase text-sm relative z-2 font-bold leading-5 tracking-tight flex items-center justify-center h-full w-full duration-600">
                {text}
              </div>
              <div className="absolute top-0 left-0 h-full w-full z-1 duration-600">
                <LetsBtn />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
};

export default LetsSection;