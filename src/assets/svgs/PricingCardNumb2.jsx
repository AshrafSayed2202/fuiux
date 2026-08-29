const PricingCardNumb2 = ({isHovered}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="466" height="658" viewBox="0 0 466 658" fill="none">
      <g opacity={`${isHovered ? "0.8" : "0.5"}`} filter={`${isHovered ?"url(#filter0_d_2212_6325)":""}`}>
        <path d="M452.5 551.807L345 658H289L452.5 501.688V551.807Z" className={`duration-300 ${isHovered ? "fill-[#FF0033]" :"fill-[#ff0033cc]"}`} />
        <path fillRule="evenodd" clipRule="evenodd" d="M56.5 0L0 53.5928V626.241L28.5 658H233L452.5 451.569V182.116L466 173.68V14.8869L450.5 0H56.5ZM228 640.632L438.5 443.5V12.902H71L10 73.5V615.324L34.5 640.632H228Z" className={`duration-300 ${isHovered ? "fill-[#FF0033]" : "fill-[#ff0033cc]"}`} />
        <path d="M438.5 443.5L228 640.632H34.5L10 615.324V73.5L71 12.902H438.5V443.5Z" className={`duration-300 ${isHovered ? "fill-[#300405]" : "fill-[#30040566]"}`} />
      </g>
    </svg>
  )
}
export default PricingCardNumb2