import CardBorders from "./CardBorders"
import secondaryHoverSound from "../assets/sounds/secondary-hover.wav"

const AboutTag = ({ text }) => {
  const playHover = () => {
    const audio = new Audio(secondaryHoverSound)
    audio.volume = 0.15
    audio.play().catch(() => { })
  }

  return (
    <div
      className="rounded-lg border border-[#ffffff0d] bg-[#ffffff05] text-[#ffffff80] text-[12px] text-center grow whitespace-nowrap hover:text-[#FF0033] duration-800 px-2.5 sm:px-3 py-1.5 cursor-pointer relative overflow-hidden group ease-out"
      onMouseEnter={playHover}
    >
      {text}
      <CardBorders />
    </div>
  )
}

export default AboutTag