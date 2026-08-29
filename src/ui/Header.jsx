const Header = ({ header, centered = false }) => {
    return (
        <span className={`text-[12px] text-[#ff6467] uppercase leading-4 tracking-[3.60px] flex items-center gap-3 w-full ${centered ? "text-center mx-auto justify-center" : ""}`}>
            <span className="bg-[#ff0033] h-px w-8 block"></span>
            {header}
            {centered ? (
                <span className="bg-[#ff0033] h-px w-8 block"></span>
            ) : ""}
        </span>
    )
}
export default Header