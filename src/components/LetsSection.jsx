import { useState } from "react";
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

const LetsSection = () => {
  const [contactOpen, setContactOpen] = useState(false);

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
      <div className="relative" style={{ height: "calc(200vh + 300px)" }} id="contact">
        <div className="sticky top-0 h-screen z-10 bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
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
          <img
            src={LetsChar1}
            alt="lets-char-1"
            className="absolute bottom-0 right-0 h-full object-cover object-center"
          />
          <img
            src={LetsChar2}
            alt="lets-char-2"
            className="absolute bottom-0 left-0 h-full object-cover object-center"
          />

          <div className="relative w-full flex container flex-col gap-14 pt-20 pb-30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Header header="Let's collaborate" centered={true} Line={false} />
            </motion.div>
            <motion.h1
              className="text-[80px] font-extrabold text-white text-center leading-[100%] tracking-[-1.6px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              Have a project in
              <span className="neon-text"> mind? </span>
            </motion.h1>
            <motion.p
              className="text-white/40 text-base font-normal leading-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              I'm open to freelance projects, full-time roles, and long-term{" "}
              <br /> partnerships. Let's make something great together.
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