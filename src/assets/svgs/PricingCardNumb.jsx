const PricingCardNumb = ({isHovered}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="466" height="618" viewBox="0 0 466 618" fill="none">
      <g opacity={`${isHovered?"0.8":"0.8"}`} filter={`${isHovered?"url(#filter0_d_2212_6325)":""}`}>
        <path d="M452.5 518.262L345 618H289L452.5 471.19V518.262Z" className={`duration-300 ${isHovered ?"fill-[#FF0033]":"fill-[rgba(255,255,255,0.06)]"}`}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M56.5 0L0 50.3348V588.172L28.5 618H233L452.5 424.118V171.045L466 163.122V13.9819L450.5 0H56.5ZM228 601.688L438.5 416.539V12.1176H71L10 69.0319V577.919L34.5 601.688H228Z" className={`duration-300 ${isHovered ?"fill-[#FF0033]":"fill-[rgba(255,255,255,0.06)]"}`} />
        <path d="M438.5 416.539L228 601.688H34.5L10 577.919V69.0319L71 12.1176H438.5V416.539Z" className={`duration-300 ${isHovered ?"fill-[#300405]":"fill-[rgba(255,255,255,0.016)]"}`} />
      </g>
    </svg>
  )
}
export default PricingCardNumb