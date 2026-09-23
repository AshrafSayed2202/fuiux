import CardBorders from "./CardBorders"
import secondaryHoverSound from "../assets/sounds/secondary-hover.wav"

const AboutCard = ({ title, text }) => {
  const playHover = () => {
    const audio = new Audio(secondaryHoverSound)
    audio.volume = 0.15
    audio.play().catch(() => { }) // ignore autoplay restrictions
  }

  return (
    <div
      className="rounded-2xl border border-[#ffffff0d] bg-[#ffffff05] px-6 py-10.5 flex flex-col gap-2 items-center justify-center flex-1 cursor-pointer relative overflow-hidden group"
      onMouseEnter={playHover}
    >
      <span className="text-[42px] font-bold text-white leading-[150%] text-center group-hover:text-[#FF0033]">
        {title}
      </span>
      <span className="text-[16px] font-normal text-[#ffffff59] leading-[106.667%] uppercase text-center group-hover:text-[#FF003359]">
        {text}
      </span>
      <CardBorders />
    </div>
  )
}

export default AboutCard