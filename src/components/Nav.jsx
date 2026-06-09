import MenuButton from "../ui/MenuButton"
import SoundButton from "../ui/SoundButton"
import TextLogo from "../ui/TextLogo"

const Nav = () => {
  return (
    <nav className="max-w-screen sticky top-0 z-10 mx-auto flex items-center justify-center p-4">
        <div className="flex items-center justify-between w-full max-w-7xl">
            <SoundButton/>
            <TextLogo/>
            <MenuButton/>
        </div>
    </nav>
  )
}
export default Nav