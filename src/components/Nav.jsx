import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuButton from "../ui/MenuButton"
import TextLogo from "../ui/TextLogo"
import NavContainer from "../assets/svgs/NavContainer";
import NavMenu from "./NavMenu";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showContainer = isScrolled && !isMenuOpen;

  return (
    <>
      <nav className={`max-w-screen fixed w-screen z-50 mx-auto flex items-center justify-center p-4 duration-300 ${isScrolled?'top-5':'top-0'}`}>
        <div className="relative flex items-center justify-between w-full max-w-7xl">
          <motion.div
            animate={{ x: showContainer ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <TextLogo active={isMenuOpen} />
          </motion.div>
          <motion.div
            animate={{ x: showContainer ? -90 : 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <MenuButton active={isMenuOpen} open={() => setIsMenuOpen(!isMenuOpen)} />
          </motion.div>
          <AnimatePresence>
            {showContainer && (
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[-1]"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <NavContainer />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NavMenu onClose={() => setIsMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
export default Nav