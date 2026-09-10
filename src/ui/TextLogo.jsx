const TextLogo = ({ active }) => {
  return (
    <div className="text-4xl font-bold text-white flex items-center relative">
      <span className={`absolute right-full top-0 ${active ? "opacity-100" : "opacity-0"} duration-300`}>
        INFO
        <span className={`text-[#FF0033]`}>
          @
        </span>
      </span>
      <span className={`${active ? "text-white" : "text-[#FF0033]"} duration-300`}>
        F
      </span>
      UIUX
      <span className={`absolute left-full top-0 ${active ? "opacity-100" : "opacity-0"} duration-300`}>
        .COM
      </span>
    </div>
  )
}
export default TextLogo