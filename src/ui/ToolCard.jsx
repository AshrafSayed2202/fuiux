import CardBorders from "./CardBorders"
import redCircle from "../assets/images/redCircle.png"
const ToolCard = ({ icon, text, percentage, isBlanc = false, size }) => {
  if (isBlanc) {
    return <div className={`rounded-2xl aspect-square size-${size}`} />
  }

  return (
    <div
      className={`rounded-2xl border bg-white/5 hover:bg-transparent duration-300 border-[#ffffff0d] p-6 flex flex-col gap-5 items-center justify-center cursor-pointer relative overflow-hidden group aspect-square size-${size} max-w-${size}`}
    >
      {(percentage > 0) && (
        <span className="text-[15px] font-bold text-[#FF0033] opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-[150%] absolute top-3.5 right-3.5">
          {percentage}%
        </span>
      )}
      {icon && icon}
      {text.length > 0 && (
        <span className="text-[15px] font-normal text-[#ffffff59] leading-[106.667%] uppercase text-center group-hover:text-[#FF003359] transition-colors duration-500">
          {text}
        </span>
      )}
      <img src={redCircle} alt="" className="absolute bottom-1 left-1" />
      <CardBorders />
    </div>
  )
}

export default ToolCard