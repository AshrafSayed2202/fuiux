import CardBorders from "./CardBorders"
import redCircle from "../assets/images/redCircle.png"
import secondaryHoverSound from "../assets/sounds/secondary-hover.wav"

const ToolCard = ({ icon, text, percentage, isBlanc = false, size, bigDot }) => {
  if (isBlanc) {
    return (
      <div
        className="rounded-2xl aspect-square w-full"
        style={{ maxWidth: `${size}px` }}
      />
    )
  }

  const playHover = () => {
    const audio = new Audio(secondaryHoverSound)
    audio.volume = 0.15
    audio.play().catch(() => { })
  }

  return (
    <div
      className="rounded-xl lg:rounded-2xl border bg-[#0F0F0F] backdrop-blur-[10px] duration-300 border-[#ffffff0d] p-2 lg:p-6 flex flex-col gap-2 lg:gap-5 items-center justify-center cursor-pointer relative overflow-hidden group aspect-square w-full"
      style={{ maxWidth: `${size}px` }}
      onMouseEnter={playHover}
    >
      {percentage > 0 && (
        <span className="text-[11px] lg:text-[15px] font-bold text-[#FF0033] opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-[150%] absolute top-2 right-2 lg:top-3.5 lg:right-3.5">
          {percentage}%
        </span>
      )}
      {icon && (
        <div className="flex items-center justify-center w-full [&>svg]:h-auto [&>svg]:max-w-[42%] lg:[&>svg]:max-w-none">
          {icon}
        </div>
      )}
      {text.length > 0 && (
        <span className="text-[8px] lg:text-[15px] font-normal text-[#ffffff59] leading-[106.667%] uppercase text-center tracking-[1.5px] lg:tracking-normal group-hover:text-[#FF003359] transition-colors duration-500">
          {text}
        </span>
      )}
      <img
        src={redCircle}
        alt=""
        className={`absolute w-2 h-2 lg:w-auto lg:h-auto ${bigDot ? "scale-150 bottom-4 left-4" : "bottom-1 left-1 lg:bottom-1.5 lg:left-1.5"}`}
      />
      <CardBorders />
    </div>
  )
}

export default ToolCard