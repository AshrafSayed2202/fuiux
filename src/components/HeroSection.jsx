import HeroBg from "../ui/HeroBg"

const HeroSection = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <span className=" text-white absolute z-50 top-1/2 -translate-y-1/2 text-center rotate-270 tracking-[4.8px] text-[12px] opacity-15 select-none">
                Designer & Creative Director
            </span>
            <span className=" text-white absolute z-50 top-1/2 right-0 -translate-y-1/2 text-center rotate-90 tracking-[4.8px] text-[12px] opacity-15 select-none">
                Based in Cairo,egypt — 2026
            </span>
            <HeroBg />
        </div>
    )
}
export default HeroSection