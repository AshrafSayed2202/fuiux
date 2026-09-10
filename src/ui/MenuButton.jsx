import MenuBtn1 from "../assets/svgs/MenuBtn1"
import MenuBtn2 from "../assets/svgs/MenuBtn2"
import { useScrambleText } from "../hooks/useScrambleText"

const MenuButton = ({ active, open }) => {
  const { text, start, stop } = useScrambleText("Hire me")

  return (
    <div className="flex items-center overflow-hidden">
      <div
        className={`h-10.5 w-37 relative cursor-pointer group overflow-hidden`}
        onMouseEnter={start}
        onMouseLeave={stop}
      >
        <div className={`text-white uppercase text-sm relative z-2 font-bold leading-5 tracking-tight flex items-center justify-center h-full w-full duration-600 ${active ? "translate-x-[105%] opacity-0" : ""}`}>
          {text}
        </div>
        <div className={`absolute top-0 left-0 h-full w-full z-1 duration-600 ${active ? "translate-x-[105%] opacity-0" : ""}`}>
          <MenuBtn1 />
        </div>
      </div>
      <div className="h-10.5 w-18.5 relative cursor-pointer group">
        <div className="relative z-2 h-full w-full flex flex-col items-center gap-1 justify-center pr-3.75" onClick={open}>
          <span className={`h-1 w-5  bg-white rounded-lg duration-300 -translate-x-1.75 ${active ? "rotate-45 -translate-x-3 translate-y-px" : ""} `} />
          <span className={`h-1 w-10 bg-white rounded-lg duration-300 ${active ? "-rotate-45 -translate-x-1.25" : ""} `} />
          <span className={`h-1 w-5  bg-white rounded-lg duration-300 translate-x-1.75 ${active ? "rotate-45 translate-x-0.75! -translate-y-px" : ""} `} />
        </div>
        <div className="absolute top-0 left-0 h-full w-full -translate-x-3.75">
          <MenuBtn2 />
        </div>
      </div>
    </div>
  )
}
export default MenuButton