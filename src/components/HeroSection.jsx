import { useScroll, useTransform, useMotionValue, motion } from "framer-motion"
import HeroBg from "../ui/HeroBg"
import NeonHover from "../ui/NeonHover"
import HeroLogo from "../assets/svgs/HeroLogo"
import WhatsAppContainer from "../assets/svgs/WhatsAppContainer"
import WhatsAppIcon from "../assets/svgs/WhatsAppIcon"
import SmallMask from "../assets/svgs/SmallMask"

// WhatsApp number: country code + number, digits only (no "+", spaces or leading 0).
// Example for Egypt: "201001234567"  <-- REPLACE THE PLACEHOLDER BELOW
const WHATSAPP_NUMBER = "20XXXXXXXXXX"
// Optional pre-filled message. Use "" for none.
const WHATSAPP_MESSAGE = "Hi! I'd like to talk about a project."
const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    (WHATSAPP_MESSAGE ? `?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` : "")

const HeroSection = () => {
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end end"]
    })

    const scale = useTransform(scrollYProgress, [0, 0.2, 1], [1.1, 0.35, 0.38])
    const textOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0])

    // The left panel fades out on scroll; once it is invisible it must stop
    // reacting to the mouse (no pointer cursor / neon over empty space).
    const panelPointerEvents = useTransform(textOpacity, (v) => (v > 0.05 ? "auto" : "none"))

    // 1 while the small mask in the side panel is hovered. HeroBg reads it to
    // wipe the real helmet in from top to bottom.
    const maskHover = useMotionValue(0)

    const logoOpacity = useTransform(scrollYProgress, [0, 0.18, 0.30, 0.38], [0, 0, 1, 1])
    const logoScale = useTransform(scrollYProgress, [0, 0.18, 0.30, 0.40], [2.5, 2.5, 1.15, 0.8])

    const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.3, 0.3])
    const mouseEnabled = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0])

    return (
        <div className="h-[700vh]" id="home">
            <div className="w-full sticky top-0 z-10 flex items-center justify-center overflow-hidden bg-zinc-950">
                <motion.div
                    className="absolute z-50 bottom-[2%] left-[12%] w-30 h-65 tracking-[4.8px] text-[12px] select-none uppercase text-[#ffffff26]"
                    style={{ opacity: textOpacity, pointerEvents: panelPointerEvents }}
                >
                    <span className="text-[12px] tracking-[0%] text-[#FF6467E5] flex justify-between">
                        AVAILABLE
                        <span className="w-2 h-2 bg-[#FB2C36] rounded-full block mt-2 mr-2">
                        </span>
                    </span>
                    <div className="flex flex-col justify-evenly items-center h-full">
                        <NeonHover href={whatsappUrl} label="Chat with me on WhatsApp">
                            <WhatsAppIcon/>
                        </NeonHover>
                        <div className="w-2/3 h-px bg-[#99001F]"/>
                        <NeonHover
                            onMouseEnter={() => maskHover.set(1)}
                            onMouseLeave={() => maskHover.set(0)}
                        >
                            <SmallMask/>
                        </NeonHover>
                    </div>
                    <div className="absolute bottom-0">
                        <WhatsAppContainer />
                    </div>
                </motion.div>
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
                    className="absolute z-50 top-1/10 left-1/2 -translate-x-1/2 select-none pointer-events-none"
                    style={{ opacity: logoOpacity, scale: logoScale }}
                >
                    <HeroLogo />
                </motion.div>

                <motion.div
                    className="absolute z-50 bottom-0 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center select-none uppercase flex flex-col items-center gap-2 justify-center pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    <span className="bold z-50 relative text-white bold tracking-[4.8px] text-[12px] opacity-20">
                        Scroll
                    </span>
                    <span className="h-12 w-px block bg-linear-to-b from-[#ffffff33] to-transparent"></span>
                    <div className="absolute flex items-center gap-2 justify-center py-2 px-4 bg-[#46080933] border-[#E7000B4D] border rounded-lg -bottom-4">
                        <span className="size-2 min-w-2 rounded-full bg-[#FB2C36]"></span>
                        <span className="text-[#FF6467E5] z-50 relative tracking-[4.8px] text-[12px] uppercase block text-nowrap">
                            Available for Projects
                        </span>
                    </div>
                </motion.div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
                    className="relative h-screen w-full flex items-center justify-center z-10"
                    style={{ scale: scale }}
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