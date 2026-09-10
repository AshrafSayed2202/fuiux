import { useState } from "react";
import MenuButton from "../ui/MenuButton"
import TextLogo from "../ui/TextLogo"

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="max-w-screen fixed w-screen top-0 z-50 mx-auto flex items-center justify-center p-4">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <TextLogo active={isMenuOpen} />
        <MenuButton active={isMenuOpen} open={() => setIsMenuOpen(!isMenuOpen)} />
      </div>
    </nav>
  )
}
export default Nav