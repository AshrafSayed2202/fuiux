const Header = ({ header }) => {
    return (
        <span className="text-[12px] text-[#ff6467] uppercase flex items-center gap-3 w-full">
            <span className="bg-[#ff0033] h-px w-8 block"></span>
            {header}
        </span>
    )
}
export default Header