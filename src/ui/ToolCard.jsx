import CardBorders from "./CardBorders"

const ToolCard = ({ icon, text, percentage, isBlanc = false }) => {
  if (isBlanc) {
    return <div className="rounded-2xl aspect-square size-55.75" />
  }

  return (
    <div
      className={`rounded-2xl border border-[#ffffff0d] p-6 flex flex-col gap-5 items-center justify-center cursor-pointer relative overflow-hidden group aspect-square size-55.75`}
    >
      <span className="text-[15px] font-bold text-[#FF0033] opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-[150%] absolute top-3.5 right-3.5">
        {percentage}%
      </span>

      {icon}

      <span className="text-[15px] font-normal text-[#ffffff59] leading-[106.667%] uppercase text-center group-hover:text-[#FF003359] transition-colors duration-500">
        {text}
      </span>

      <CardBorders />
    </div>
  )
}

export default ToolCard