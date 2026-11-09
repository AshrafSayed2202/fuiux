import { useEffect, useState } from "react"
import { useScroll, useTransform, useMotionValue, motion } from "framer-motion"
import HeroBg from "../ui/HeroBg"
import NeonHover from "../ui/NeonHover"
import HeroLogo from "../assets/svgs/HeroLogo"
import WhatsAppContainer from "../assets/svgs/WhatsAppContainer"
import WhatsAppIcon from "../assets/svgs/WhatsAppIcon"
import SmallMask from "../assets/svgs/SmallMask"

const WHATSAPP_NUMBER = "201143637341"
const WHATSAPP_MESSAGE = "Hi! I'd like to talk about a project."
const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    (WHATSAPP_MESSAGE ? `?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` : "")

const MOBILE_QUERY = "(max-width: 639px)"
const MOBILE_CROP_TOP = 33
const MOBILE_CROP_BOTTOM = 31
const MOBILE_CARD_SCALE = 0.76

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
    )

    useEffect(() => {
        const mq = window.matchMedia(MOBILE_QUERY)
        const onChange = (e) => setIsMobile(e.matches)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMobile(mq.matches)
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }, [])

    return isMobile
}

const HeroSection = () => {
    const isMobile = useIsMobile()

    const { scrollYProgress } = useScroll({
        offset: ["start start", "end end"]
    })

    const scaleDesktop = useTransform(scrollYProgress, [0, 0.2, 1], [1.1, 0.35, 0.38])
    const scaleMobile = useTransform(
        scrollYProgress,
        [0, 0.2, 1],
        [1, MOBILE_CARD_SCALE, MOBILE_CARD_SCALE + 0.04]
    )

    const clipDesktop = useTransform(
        scrollYProgress,
        [0, 0.2, 1],
        ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
    )
    const clipMobile = useTransform(
        scrollYProgress,
        [0, 0.2, 1],
        [
            "inset(0% 0% 0% 0%)",
            `inset(${MOBILE_CROP_TOP}% 0% ${MOBILE_CROP_BOTTOM}% 0%)`,
            `inset(${MOBILE_CROP_TOP}% 0% ${MOBILE_CROP_BOTTOM}% 0%)`
        ]
    )

    const textOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0])
    const panelPointerEvents = useTransform(textOpacity, (v) => (v > 0.05 ? "auto" : "none"))
    const maskHover = useMotionValue(0)

    const logoOpacity = useTransform(scrollYProgress, [0, 0.18, 0.30, 0.38], [0, 0, 1, 1])
    const logoScale = useTransform(scrollYProgress, [0, 0.18, 0.30, 0.40], [2.5, 1, 1, 0.8])

    const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.3, 0.3])
    const mouseEnabled = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0])

    return (
        <div className="h-[700vh]" id="home">
            <div className="w-full sticky top-0 z-10 flex items-center justify-center overflow-hidden bg-zinc-950">
                <motion.div
                    className="absolute z-50 bottom-[2%] left-[8%] sm:left-[12%] w-24 sm:w-30 h-56 sm:h-65 tracking-[4.8px] text-[11px] sm:text-[12px] select-none uppercase text-[#ffffff26] hidden sm:block"
                    style={{ opacity: textOpacity, pointerEvents: panelPointerEvents }}
                >
                    <span className="text-[11px] sm:text-[12px] tracking-[0%] text-[#FF6467E5] flex justify-between">
                        AVAILABLE
                        <span className="w-2 h-2 bg-[#FB2C36] rounded-full block mt-2 mr-2" />
                    </span>
                    <div className="flex flex-col justify-evenly items-center h-full">
                        <NeonHover href={whatsappUrl} label="Chat with me on WhatsApp">
                            <WhatsAppIcon />
                        </NeonHover>
                        <div className="w-2/3 h-px bg-[#99001F]" />
                        <NeonHover
                            onMouseEnter={() => maskHover.set(1)}
                            onMouseLeave={() => maskHover.set(0)}
                        >
                            <SmallMask />
                        </NeonHover>
                    </div>
                    <div className="absolute bottom-0">
                        <WhatsAppContainer />
                    </div>
                </motion.div>

                <motion.div
                    className="absolute z-50 top-[36%] sm:top-1/2 left-3.5 sm:left-0 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 text-center rotate-270 whitespace-nowrap tracking-[3px] sm:tracking-[4.8px] text-[10px] sm:text-[12px] select-none uppercase text-[#ffffff26] pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    Designer & Creative Director
                </motion.div>
                <motion.div
                    className="absolute z-50 top-[36%] sm:top-1/2 right-3.5 sm:right-0 translate-x-1/2 sm:translate-x-0 -translate-y-1/2 text-center rotate-90 whitespace-nowrap tracking-[3px] sm:tracking-[4.8px] text-[10px] sm:text-[12px] select-none uppercase text-[#ffffff26] pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    Based in Cairo,egypt — 2026
                </motion.div>

                <motion.div
                    className="absolute z-50 top-[6%] sm:top-1/10 left-1/2 -translate-x-1/2 select-none pointer-events-none scale-[0.65] sm:scale-100"
                    style={{ opacity: logoOpacity, scale: logoScale }}
                >
                    <HeroLogo />
                </motion.div>

                <motion.div
                    className="absolute z-50 bottom-4 sm:bottom-0 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center select-none uppercase flex flex-col items-center gap-2 justify-center pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    <span className="bold z-50 relative text-white tracking-[3px] sm:tracking-[4.8px] text-[10px] sm:text-[12px] opacity-20">
                        Scroll
                    </span>
                    <span className="h-6 sm:h-12 w-px block bg-linear-to-b from-[#ffffff33] to-transparent" />
                    <div className="absolute flex items-center gap-2 justify-center py-1 sm:py-2 px-2.5 sm:px-4 bg-[#46080933] border-[#E7000B4D] border rounded-lg -bottom-2 sm:-bottom-4">
                        <span className="size-1.5 sm:size-2 min-w-2 rounded-full bg-[#FB2C36]" />
                        <span className="text-[#FF6467E5] z-50 relative tracking-[2.5px] sm:tracking-[4.8px] text-[10px] sm:text-[12px] uppercase block text-nowrap">
                            Available for Projects
                        </span>
                    </div>
                </motion.div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 ">
                    <motion.div
                        className="absolute top-[52%] sm:top-[40%] left-1/2 -translate-x-1/2 w-[160%] text-[#FF0033] text-[44px] sm:text-[100px] font-extrabold leading-[100%] tracking-[-0.8px] sm:tracking-[-1.6px] whitespace-nowrap uppercase"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    >
                        Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer Product Designer Product Designer  Product Designer
                    </motion.div>

                    <motion.div
                        className="absolute top-[45%] sm:top-[50%] left-1/2 -translate-x-1/2 w-[160%] text-white text-[44px] sm:text-[100px] font-extrabold leading-[100%] tracking-[-0.8px] sm:tracking-[-1.6px] whitespace-nowrap uppercase"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                    >
                        UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER  UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER UI/UX TEAM LEADER
                    </motion.div>
                </div>

                <motion.div
                    className="relative h-screen w-full flex items-center justify-center z-10"
                    style={{
                        scale: isMobile ? scaleMobile : scaleDesktop,
                        clipPath: isMobile ? clipMobile : clipDesktop
                    }}
                >
                    <motion.div
                        className="absolute inset-0 z-40 pointer-events-none"
                        style={{ opacity: overlayOpacity }}
                    >
                        <div className="absolute inset-0 bg-[#E7000B] mix-blend-multiply" />
                    </motion.div>

                    <HeroBg mouseEnabled={mouseEnabled} scrollYProgress={scrollYProgress} maskHover={maskHover} />
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection