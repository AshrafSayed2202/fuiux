const PricingBtn = ({isHovered,isMid}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="206" height="48" viewBox="0 0 206 48" fill="none">
      <path d="M180.901 0.5L205.5 24.2119V47.5H21.207L0.5 25.3672V0.5H180.901Z" className={`duration-300 ${isHovered ?"fill-[#FF0033]":isMid?"fill-[#ff003366]":"stroke-1 fill-transparent stroke-white opacity-10"}`} />
    </svg>
  )
}
export default PricingBtn