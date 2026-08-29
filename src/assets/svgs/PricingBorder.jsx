const PricingBorder = ({ isHovered,isMid }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="216" height="216" viewBox="0 0 216 216" fill="none">
      <g opacity={isHovered?"1":"0.5"}>
        <path d="M74.6544 0H135.572V6.01671H74.6544V0Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
        <path d="M212.018 135.577H216V164.256L174.393 215.599L159.86 215.799V211.588H172.402L212.018 162.852V135.577Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
        <path d="M70.4737 212.791V214.396H140.151V212.791H70.4737Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
        <path d="M142.54 212.791V214.396H145.725V212.791H142.54Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
        <path d="M56.5382 211.588V216H41.8064L0 164.457V135.376H4.37972V162.652L43.7972 211.588H56.5382Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
        <path d="M159.86 1.20334V5.21448H172.402L212.218 54.351V81.2256H216V52.7465L174.194 1.20334H159.86Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
        <path d="M137.165 0H140.35V6.01671H137.165V0Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
        <path d="M146.721 0.802228H147.517V2.60724H149.707V3.61003H147.517V5.21448H146.721V0.802228Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
        <path d="M56.3392 5.21448V1.20334H41.8064L0.199078 52.546V81.4262H3.98157V54.1504L43.7972 5.21448H56.3392Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
        <path d="M58.9272 2.60724H60.1217V3.61003H58.9272V2.60724Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
        <path d="M68.8811 5.21448V0.601671H67.8857V2.40669H64.8995V3.40947H67.8857V5.21448H68.8811Z" className={`duration-300 ${isHovered?"fill-[#FF0033]":isMid?"fill-[#ff003333]":"fill-[#ffffff0f]"}`} />
      </g>
    </svg>
  )
}
export default PricingBorder