import CardBorders from "./CardBorders"

const AboutTag = ({text}) => {
  return (
    <div className="rounded-lg border border-[#ffffff0d] bg-[#ffffff05] text-[#ffffff80] text-[12px] hover:text-[#FF0033] duration-500 px-3 py-1.5 cursor-pointer relative overflow-hidden group">
      {text}
      <CardBorders/>
    </div>
  )
}
export default AboutTag