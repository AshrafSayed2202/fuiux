import { useScroll, useTransform, motion } from "framer-motion"
import HeroBg from "../ui/HeroBg"

const HeroSection = () => {
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end start"]
    })

    const scale = useTransform(scrollYProgress, [0, 0.3, 1], [1.1, 0.35, 0.38])
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0, 0])
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.3, 0.3])

    const mouseEnabled = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0, 0])


    return (
        <div className="h-[300vh]">
            <div className=" w-full sticky top-0 z-10 flex items-center justify-center overflow-hidden ">
                <motion.div
                    className="absolute z-50 top-1/2 -translate-y-1/2 left-0 text-center rotate-270 tracking-[4.8px] text-[12px] select-none uppercase text-[#ffffff26] pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                Designer & Creative Director
                </motion.div>

                <motion.div
                    className="absolute z-50 top-1/2 right-0 -translate-y-1/2 text-center rotate-90 tracking-[4.8px] text-[12px] select-none uppercase text-[#ffffff26] pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                Based in Cairo,egypt — 2026
                </motion.div>

                <motion.div
                    className="absolute z-50 bottom-0 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center select-none uppercase flex flex-col items-center gap-2 justify-center pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
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
                </motion.div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[160%] text-[#FF0033] text-[100px] font-extrabold leading-[100%] tracking-[-1.6px] whitespace-nowrap uppercase"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    >
                        Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer
                    </motion.div>

                    <motion.div
                        className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[160%] text-white text-[100px] font-extrabold leading-[100%] tracking-[-1.6px] whitespace-nowrap uppercase"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                    >
                        UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER  UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER
                    </motion.div>
                </div>

                <motion.div
                    className="relative h-screen w-full flex items-center justify-center"
                    style={{ scale: scale }}
                >
                    <motion.div
                        className="absolute inset-0 z-40 pointer-events-none"
                        style={{ opacity: overlayOpacity }}
                    >
                        <div className="absolute inset-0 bg-[#E7000B] mix-blend-multiply" />
                    </motion.div>

                    <HeroBg mouseEnabled={mouseEnabled} scrollYProgress={scrollYProgress} />
                </motion.div>
            </div>
        </div>
    )
}
export default HeroSection