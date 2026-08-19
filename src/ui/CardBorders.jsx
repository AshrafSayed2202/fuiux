const CardBorders = ({ active = false, byHover = true }) => {
  return (
    <div>
      <div className={`opacity-0 duration-500 ${active ? "opacity-100" : ""} ${(byHover) ? "group-hover:opacity-100" : ""} absolute w-px h-[30%] bg-[#FF0033] left-0 top-1`}></div>
      <div className={`opacity-0 duration-500 ${active ? "opacity-100" : ""} ${(byHover) ? "group-hover:opacity-100" : ""} absolute w-px h-[30%] bg-[#FF0033] right-0 top-1`}></div>
      <div className={`opacity-0 duration-500 ${active ? "opacity-100" : ""} ${(byHover) ? "group-hover:opacity-100" : ""} absolute w-px h-[30%] bg-[#FF0033] left-0 bottom-1`}></div>
      <div className={`opacity-0 duration-500 ${active ? "opacity-100" : ""} ${(byHover) ? "group-hover:opacity-100" : ""} absolute w-px h-[30%] bg-[#FF0033] right-0 bottom-1`}></div>
      <div className={`opacity-0 duration-500 ${active ? "opacity-100" : ""} ${(byHover) ? "group-hover:opacity-100" : ""} absolute h-px w-[30%] bg-[#FF0033] bottom-0 left-1`}></div>
      <div className={`opacity-0 duration-500 ${active ? "opacity-100" : ""} ${(byHover) ? "group-hover:opacity-100" : ""} absolute h-px w-[30%] bg-[#FF0033] top-0 left-1`}></div>
      <div className={`opacity-0 duration-500 ${active ? "opacity-100" : ""} ${(byHover) ? "group-hover:opacity-100" : ""} absolute h-px w-[30%] bg-[#FF0033] bottom-0 right-1`}></div>
      <div className={`opacity-0 duration-500 ${active ? "opacity-100" : ""} ${(byHover) ? "group-hover:opacity-100" : ""} absolute h-px w-[30%] bg-[#FF0033] top-0 right-1`}></div>
    </div>
  )
}
export default CardBorders