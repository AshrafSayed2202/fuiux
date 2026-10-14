import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuBtn1 from "../assets/svgs/MenuBtn1";
import MenuBtn2 from "../assets/svgs/MenuBtn2";
import { useScrambleText } from "../hooks/useScrambleText";
import hoverSound from "../assets/sounds/hover.wav";
import clickSound from "../assets/sounds/click.wav";
import ContactModal from "../components/ContactModal";
import NavMenu from "../components/NavMenu";

const MenuButton = ({ open }) => {
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Visual state is driven only by our own menuOpen
  const isActive = menuOpen;

  const { text, start, stop, click } = useScrambleText("Hire me", {
    hoverSound,
    clickSound,
    volume: 0.45,
  });

  const handleHireClick = () => {
    if (isActive) return;
    click();
    setContactOpen(true);
  };

  const handleBurgerClick = () => {
    click();
    setMenuOpen((prev) => !prev);
    open?.();
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="flex items-center overflow-hidden relative z-60">
        {/* Hire me */}
        <div
          className={`h-10.5 w-37 relative group overflow-hidden ${isActive ? "pointer-events-none select-none" : "cursor-pointer"
            }`}
          onMouseEnter={() => {
            if (!isActive) start();
          }}
          onMouseLeave={() => {
            if (!isActive) stop();
          }}
          onClick={handleHireClick}
        >
          <div
            className={`text-white uppercase text-sm relative z-2 font-bold leading-5 tracking-tight flex items-center justify-center h-full w-full duration-600 ${isActive ? "translate-x-[105%] opacity-0" : ""
              }`}
          >
            {text}
          </div>
          <div
            className={`absolute top-0 left-0 h-full w-full z-1 duration-600 ${isActive ? "translate-x-[105%] opacity-0" : ""
              }`}
          >
            <MenuBtn1 />
          </div>
        </div>

        {/* Burger / X */}
        <div
          className="h-10.5 w-18.5 relative z-2 cursor-pointer group"
          onMouseEnter={start}
          onMouseLeave={stop}
          onClick={handleBurgerClick}
        >
          <div className="relative z-2 h-full w-full flex flex-col items-center gap-1 justify-center pr-3.75">
            <span
              className={`h-1 w-5 bg-white rounded-lg duration-300 -translate-x-1.75 ${isActive ? "rotate-45 -translate-x-3 translate-y-px" : ""
                }`}
            />
            <span
              className={`h-1 w-10 bg-white rounded-lg duration-300 ${isActive ? "-rotate-45 -translate-x-1.25" : ""
                }`}
            />
            <span
              className={`h-1 w-5 bg-white rounded-lg duration-300 translate-x-1.75 ${isActive ? "rotate-45 translate-x-0.75! -translate-y-px" : ""
                }`}
            />
          </div>
          <div className="absolute top-0 left-0 h-full w-full -translate-x-3.75">
            <MenuBtn2 />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="nav-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }}
            className="fixed inset-0 z-50"
          >
            <NavMenu onClose={handleMenuClose} />
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
};

export default MenuButton;