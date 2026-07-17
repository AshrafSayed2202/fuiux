import HeroBg from "../ui/HeroBg"

const HeroSection = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <span className=" text-white absolute z-50 top-1/2 -translate-y-1/2 text-center rotate-270 tracking-[4.8px] text-[12px] opacity-15 select-none uppercase">
                Designer & Creative Director
            </span>
            <span className=" text-white absolute z-50 top-1/2 right-0 -translate-y-1/2 text-center rotate-90 tracking-[4.8px] text-[12px] opacity-15 select-none uppercase">
                Based in Cairo,egypt — 2026
            </span>
            <div className="absolute z-50 bottom-0 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center select-none uppercase flex flex-col items-center gap-2 justify-center">
                <span className="bold z-50 relative text-white bold tracking-[4.8px] text-[12px] opacity-20">
                    Scroll
                </span>
                <span className="h-12 w-px block bg-linear-to-b from-[#ffffff33] to-transparent" ></span>
                <div className="absolute flex items-center gap-2 justify-center py-2 px-4 bg-[#46080933] border-[#E7000B4D] border rounded-lg -bottom-4">
                    <span className="size-2 min-w-2 rounded-full bg-[#FB2C36]"></span>
                    <span className="text-[#FF6467E5] z-50 relative tracking-[4.8px] text-[12px] uppercase block text-nowrap">
                        Available for Projects
                    </span>
                </div>
            </div>
            <HeroBg />
        </div>
    )
}
export default HeroSection