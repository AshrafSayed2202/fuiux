import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, useMotionValue, motion } from "framer-motion"
import HeroBg from "../ui/HeroBg"
import { MOBILE_CLIP } from "../ui/heroConfig"
import NeonHover from "../ui/NeonHover"
import HeroLogo from "../assets/svgs/HeroLogo"
import WhatsAppContainer from "../assets/svgs/WhatsAppContainer"
import WhatsAppIcon from "../assets/svgs/WhatsAppIcon"
import SmallMask from "../assets/svgs/SmallMask"
import FingerIcon from "../assets/svgs/FingerIcon"
import clickSound from "../assets/sounds/click.wav"

const WHATSAPP_NUMBER = "201143637341"
const WHATSAPP_MESSAGE = "Hi! I'd like to talk about a project."
const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    (WHATSAPP_MESSAGE ? `?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` : "")

const MOBILE_QUERY = "(max-width: 639px)"
const MOBILE_CROP_TOP = MOBILE_CLIP.top * 100
const MOBILE_CROP_BOTTOM = MOBILE_CLIP.bottom * 100
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

// Small screens: lets the user freeze page scrolling so swiping the hero drives the
// reveal effect instead of scrolling. Overflow hidden covers most browsers; the
// touchmove guard (scoped to the hero) covers iOS Safari, which ignores overflow on body.
const useScrollLock = (locked, containerRef) => {
    useEffect(() => {
        if (!locked) return
        const html = document.documentElement
        const body = document.body
        const prevHtml = html.style.overflow
        const prevBody = body.style.overflow
        html.style.overflow = "hidden"
        body.style.overflow = "hidden"

        const container = containerRef.current
        const preventTouchScroll = (e) => {
            if (e.cancelable && container && container.contains(e.target)) e.preventDefault()
        }
        document.addEventListener("touchmove", preventTouchScroll, { passive: false })

        return () => {
            html.style.overflow = prevHtml
            body.style.overflow = prevBody
            document.removeEventListener("touchmove", preventTouchScroll)
        }
    }, [locked, containerRef])
}

const HeroSection = () => {
    const isMobile = useIsMobile()
    const heroRef = useRef(null)
    const [scrollLocked, setScrollLocked] = useState(false)
    const lockedMV = useMotionValue(0)
    useScrollLock(scrollLocked, heroRef)

    const toggleScrollLock = () => {
        const audio = new Audio(clickSound)
        audio.volume = 0.45
        audio.play().catch(() => { })
        setScrollLocked((prev) => {
            lockedMV.set(prev ? 0 : 1)
            return !prev
        })
    }

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
        [0, MOBILE_CLIP.end, 1],
        [
            "inset(0% 0% 0% 0%)",
            `inset(${MOBILE_CROP_TOP}% 0% ${MOBILE_CROP_BOTTOM}% 0%)`,
            `inset(${MOBILE_CROP_TOP}% 0% ${MOBILE_CROP_BOTTOM}% 0%)`
        ]
    )

    const textOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0])
    const panelPointerEvents = useTransform(textOpacity, (v) => (v > 0.05 ? "auto" : "none"))
    // the lock button fades out with the hero text, but stays visible while locked
    const lockBtnOpacity = useTransform([textOpacity, lockedMV], ([t, l]) => Math.max(t, l))
    const lockBtnPointerEvents = useTransform(lockBtnOpacity, (v) => (v > 0.05 ? "auto" : "none"))
    const maskHover = useMotionValue(0)

    const logoOpacity = useTransform(scrollYProgress, [0, 0.18, 0.30, 0.38], [0, 0, 1, 1])
    // phones keep the logo at its full 209px size in the titles stage (Figma mobile frame)
    const logoScale = useTransform(scrollYProgress, [0, 0.18, 0.30, 0.40], [2.5, 1, 1, isMobile ? 1 : 0.8])

    const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.3, 0.3])
    const mouseEnabled = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0])

    return (
        <div className="h-[700vh]" id="home" ref={heroRef}>
            <div className="w-full sticky top-0 z-10 flex items-center justify-center overflow-hidden bg-zinc-950">
                <motion.button
                    type="button"
                    onClick={toggleScrollLock}
                    aria-pressed={scrollLocked}
                    aria-label={scrollLocked ? "Unlock scrolling" : "Lock scrolling to play with the background"}
                    title={scrollLocked ? "Unlock scrolling" : "Lock scrolling"}
                    className={`absolute z-50 bottom-18 right-4 sm:hidden size-11 rounded-lg border flex items-center justify-center cursor-pointer select-none backdrop-blur-[6px] duration-300 ease-out ${scrollLocked
                        ? "bg-[#FF0033] border-[#FF0033] text-white shadow-[0_0_18px_#FF003380]"
                        : "bg-[#46080933] border-[#E7000B4D] text-[#FF6467E5]"
                        }`}
                    style={{ opacity: lockBtnOpacity, pointerEvents: lockBtnPointerEvents }}
                    whileTap={{ scale: 0.92 }}
                >
                    <FingerIcon locked={scrollLocked} />
                </motion.button>

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
                    className="absolute z-50 top-24 sm:top-1/10 left-1/2 -translate-x-1/2 select-none pointer-events-none"
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

                    <HeroBg
                        mouseEnabled={mouseEnabled}
                        scrollYProgress={scrollYProgress}
                        maskHover={maskHover}
                        touchLocked={scrollLocked}
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection