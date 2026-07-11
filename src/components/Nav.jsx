import MenuButton from "../ui/MenuButton"
import TextLogo from "../ui/TextLogo"

const Nav = () => {
  return (
    <nav className="max-w-screen fixed w-screen top-0 z-50 mx-auto flex items-center justify-center p-4">
      <div className="flex items-center justify-between w-full max-w-7xl">
            <TextLogo/>
            <MenuButton/>
        </div>
    </nav>
  )
}
export default Nav