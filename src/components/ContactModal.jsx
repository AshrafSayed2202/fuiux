import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import CardBorders from "../ui/CardBorders"
import ContactBorders from "../assets/svgs/ContactBorders"
import ContactXContainer from "../assets/svgs/ContactXContainer"
import ContactHeaderBg from "../assets/svgs/ContactHeaderBg"
import ContactFormBg from "../assets/svgs/ContactFormBg"
import vector from "../assets/images/form-vector.png"
import ContactInput1 from "../assets/svgs/ContactInput1"
import ContactInput2 from "../assets/svgs/ContactInput2"
import ContactTextarea from "../assets/svgs/ContactTextarea"
import InputErrorIcon from "../assets/svgs/InputErrorIcon"
import ToastSucces from "../assets/svgs/ToastSucces"
import ToastError from "../assets/svgs/ToastError"
import MobileFormFrame from "../assets/svgs/MobileFormFrame"
import MobileFormPanel from "../assets/svgs/MobileFormPanel"
import MobileFormHeaderBg from "../assets/svgs/MobileFormHeaderBg"
import MobileFormDeco from "../assets/svgs/MobileFormDeco"
import MobileFormInput from "../assets/svgs/MobileFormInput"
import MobileFormButtonBg from "../assets/svgs/MobileFormButtonBg"
import MobileFormX from "../assets/svgs/MobileFormX"
import { useMediaQuery } from "../hooks/useMediaQuery"

// The desktop SVG composition is a fixed 825x614 box; below this the mobile composition is used.
const DESKTOP_LAYOUT_QUERY = "(min-width: 900px) and (min-height: 660px)"

// Mobile composition (Figma "Form" frame) is a fixed 370.8x570 box, scaled down when the
// viewport is smaller than that plus a margin.
const MOBILE_W = 370.838
const MOBILE_H = 570
const MOBILE_MARGIN = 10

const EMPTY_FORM = { firstName: "", lastName: "", email: "", phone: "", message: "" }

const useFitScale = (width, height, margin) => {
  const compute = () =>
    typeof window === "undefined"
      ? 1
      : Math.min(1, (window.innerWidth - margin * 2) / width, (window.innerHeight - margin * 2) / height)
  const [scale, setScale] = useState(compute)

  useEffect(() => {
    const onResize = () => setScale(compute())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, margin])

  return scale
}

const desktopInputClass = (error) =>
  `w-full py-3 px-8 text-sm relative z-2 text-white placeholder:text-white/40 outline-none transition-colors ${error ? "border-[#FF0033]" : "border-[#ffffff14]"}`

const mobileInputClass =
  "absolute inset-0 w-full h-full bg-transparent px-[25.83px] text-[11.667px] font-bold tracking-[0.29px] text-white placeholder:text-white/60 outline-none z-2"

/** Desktop input slot: SVG plate behind the control, error icon on the right. */
const DesktopField = ({ svg, error, iconClass, children }) => (
  <div className="relative">
    <div className="absolute select-none z-1">{svg}</div>
    {children}
    {error && (
      <div className={`absolute z-3 pointer-events-none ${iconClass}`}>
        <InputErrorIcon />
      </div>
    )}
  </div>
)

/** Mobile input slot: fixed-size cut-corner plate; outline reacts to focus and errors. */
const MobileField = ({ textarea = false, error, children }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="relative w-full shrink-0"
      style={{ height: textarea ? 90 : 40 }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="absolute inset-0 select-none z-1">
        <MobileFormInput textarea={textarea} error={!!error} active={focused} />
      </div>
      {children}
      {error && (
        <div className={`absolute z-3 pointer-events-none right-3 ${textarea ? "top-3" : "top-1/2 -translate-y-1/2"} scale-75`}>
          <InputErrorIcon />
        </div>
      )}
    </div>
  )
}

const ContactModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({ open: false, type: "success", title: "", message: "" })
  const isDesktopLayout = useMediaQuery(DESKTOP_LAYOUT_QUERY)
  const mobileScale = useFitScale(MOBILE_W, MOBILE_H, MOBILE_MARGIN)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      const t = setTimeout(() => {
        setForm(EMPTY_FORM)
        setErrors({})
        setIsSubmitting(false)
        setToast({ open: false, type: "success", title: "", message: "" })
      }, 300)
      return () => clearTimeout(t)
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!toast.open) return
    const t = setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }))
    }, 4000)
    return () => clearTimeout(t)
  }, [toast.open])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = "Required"
    if (!form.lastName.trim()) next.lastName = "Required"
    if (!form.email.trim()) next.email = "Required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Invalid email"
    if (!form.message.trim()) next.message = "Required"
    return next
  }

  const showToast = (type, title, message) => {
    setToast({ open: true, type, title, message })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      showToast("error", "Error", "Something went wrong. Please try again in a moment.")
      return
    }
    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(form)
      } else {
        await new Promise((r) => setTimeout(r, 700))
      }
      showToast("success", "Message sent", "We’ve received your details and will be in touch soon.")
      setForm(EMPTY_FORM)
      setTimeout(() => onClose?.(), 600)
    } catch {
      showToast("error", "Error", "Something went wrong. Please try again in a moment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputProps = (name, extra = {}) => ({
    name,
    value: form[name],
    onChange: handleChange,
    ...extra,
  })

  const panelMotion = {
    initial: { opacity: 0, scale: 0.92, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 },
    transition: { type: "spring", stiffness: 320, damping: 28 },
  }

  // Each SVG piece of a composition settles in with a short stagger.
  const piece = (delay) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  })

  const desktopIcon = "right-4 top-1/2 translate-y-[-25%]"

  const desktopPanel = (
    <motion.div className="w-206.25 h-153.5 relative" {...panelMotion} onClick={(e) => e.stopPropagation()}>
      <motion.div className="absolute" {...piece(0)}>
        <ContactBorders />
      </motion.div>
      <motion.div className="absolute right-[1.5%] top-[5%]" {...piece(0.12)}>
        <button
          type="button"
          onClick={onClose}
          className="flex cursor-pointer absolute right-[12%] top-[10%] items-center justify-center text-white"
          aria-label="Close"
        >
          <span className="text-3xl font-bold leading-none">✕</span>
        </button>
        <ContactXContainer />
      </motion.div>
      <motion.div className="absolute left-[6%] top-[6.5%]" {...piece(0.08)}>
        <div className="flex-1 px-6 py-4 absolute left-[5%]">
          <h2 className="text-2xl font-bold text-white">Let’s Contact</h2>
          <p className="mt-1.5 text-base text-white/60">
            Get in touch with us and let our Combined creativity shine.
          </p>
        </div>
        <ContactHeaderBg />
      </motion.div>
      <motion.div className="absolute left-[4.75%] top-[17.5%]" {...piece(0.16)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-12 absolute w-full mt-10">
          <div className="grid grid-cols-2 gap-3">
            <DesktopField svg={<ContactInput1 error={!!errors.firstName} />} error={errors.firstName} iconClass={desktopIcon}>
              <input {...inputProps("firstName", { placeholder: "First name" })} className={desktopInputClass(errors.firstName)} />
            </DesktopField>
            <DesktopField svg={<ContactInput1 error={!!errors.lastName} />} error={errors.lastName} iconClass={desktopIcon}>
              <input {...inputProps("lastName", { placeholder: "Last name" })} className={desktopInputClass(errors.lastName)} />
            </DesktopField>
          </div>
          <DesktopField svg={<ContactInput2 error={!!errors.email} />} error={errors.email} iconClass={desktopIcon}>
            <input {...inputProps("email", { type: "email", placeholder: "Email" })} className={desktopInputClass(errors.email)} />
          </DesktopField>
          <DesktopField svg={<ContactInput2 />} iconClass={desktopIcon}>
            <input {...inputProps("phone", { type: "tel", placeholder: "Phone number" })} className={desktopInputClass(false)} />
          </DesktopField>
          <DesktopField svg={<ContactTextarea error={!!errors.message} />} error={errors.message} iconClass="right-4 top-4">
            <textarea
              {...inputProps("message", { placeholder: "Message", rows: 4 })}
              className={`${desktopInputClass(errors.message)} resize-none px-4!`}
            />
          </DesktopField>
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative mt-2 cursor-pointer w-full overflow-hidden bg-[#FF0033] py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#ff1a4a] disabled:opacity-60"
          >
            <span className="absolute -left-4 -bottom-4 h-8 w-8 rotate-45 bg-[#2d0810]" />
            <span className="absolute -right-4 -top-4 h-8 w-8 rotate-45 bg-[#2d0810]" />
            {isSubmitting ? "Sending..." : "Send it to make a game"}
            <CardBorders byHover={false} active={false} />
          </button>
        </form>
        <ContactFormBg />
      </motion.div>
    </motion.div>
  )

  // Positions below are the Figma "Form" frame coordinates (px inside the 370.8x570 box).
  const mobilePanel = (
    <motion.div
      className="relative"
      style={{ width: MOBILE_W * mobileScale, height: MOBILE_H * mobileScale }}
      {...panelMotion}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: MOBILE_W, height: MOBILE_H, transform: `scale(${mobileScale})` }}
      >
        <motion.div className="absolute left-0 top-0" {...piece(0)}>
          <MobileFormFrame />
        </motion.div>
        <motion.div className="absolute" style={{ left: 33.75, top: 90 }} {...piece(0.06)}>
          <MobileFormPanel />
        </motion.div>
        <motion.div className="absolute" style={{ left: 235.42, top: 26.67 }} {...piece(0.14)}>
          <MobileFormDeco />
        </motion.div>
        <motion.div className="absolute" style={{ left: 41.25, top: 34.17 }} {...piece(0.1)}>
          <MobileFormHeaderBg />
        </motion.div>

        <motion.div className="absolute" style={{ left: 74.2, top: 57.5 }} {...piece(0.18)}>
          <h2 className="text-[13.333px] font-bold text-white leading-normal whitespace-nowrap">Let’s Contact</h2>
          <p className="mt-[2px] w-[173px] text-[10px] font-bold text-white/80 leading-normal">
            Get in touch with us and let our Combined creativity shine.
          </p>
        </motion.div>

        {/* 44px tap target centered on the 20.8x19.2 glyph at (336.5, 35.67) */}
        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute flex items-center justify-center cursor-pointer z-10"
          style={{ left: 324.9, top: 23.25, width: 44, height: 44 }}
          whileTap={{ scale: 0.9 }}
          {...piece(0.14)}
        >
          <MobileFormX />
        </motion.button>

        <motion.form
          onSubmit={handleSubmit}
          className="absolute flex flex-col gap-[13.333px]"
          style={{ left: 55, top: 132.5, width: 286.667 }}
          {...piece(0.22)}
        >
          <MobileField error={errors.firstName}>
            <input {...inputProps("firstName", { placeholder: "First name" })} className={mobileInputClass} />
          </MobileField>
          <MobileField error={errors.lastName}>
            <input {...inputProps("lastName", { placeholder: "Last name" })} className={mobileInputClass} />
          </MobileField>
          <MobileField error={errors.email}>
            <input {...inputProps("email", { type: "email", placeholder: "Email" })} className={mobileInputClass} />
          </MobileField>
          <MobileField>
            <input {...inputProps("phone", { type: "tel", placeholder: "Phone number" })} className={mobileInputClass} />
          </MobileField>
          <div className="mt-[1.667px]">
            <MobileField textarea error={errors.message}>
              <textarea
                {...inputProps("message", { placeholder: "Message" })}
                className={`${mobileInputClass} resize-none pt-[11.67px]`}
              />
            </MobileField>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative mt-[1.667px] w-full cursor-pointer group disabled:opacity-60"
            style={{ height: 48.333 }}
          >
            <div className="absolute inset-0 transition-[filter] duration-300 group-hover:brightness-110 group-active:brightness-90">
              <MobileFormButtonBg />
            </div>
            <span className="absolute inset-0 flex items-center justify-center text-[11.667px] font-bold uppercase tracking-[0.29px] text-white">
              {isSubmitting ? "Sending..." : "Send it to make a game"}
            </span>
          </button>
        </motion.form>
      </div>
    </motion.div>
  )

  const overlays = (
    <>
      <AnimatePresence>
        {toast.open && (
          <motion.div
            className="fixed inset-0 z-200 flex top-4 justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-[min(90vw,638px)]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {toast.type === "success" ? <ToastSucces /> : <ToastError />}
              <div className="absolute inset-0 flex flex-col px-10 sm:px-16 pointer-events-none">
                <h3 className="text-base sm:text-xl font-bold text-white leading-tight pt-1">{toast.title}</h3>
                <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-[16px] text-white/80 sm:text-nowrap pt-1 sm:pt-3">
                  {toast.message}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center p-2.5 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Background shape: sweeps in from the left on open, sweeps out on close,
                and keeps a slow drift while the modal is up. Faint on the mobile layout,
                where Figma shows it at low opacity over a blurred page. */}
            <motion.div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              initial={{ opacity: 0, scale: 1.18, x: -90 }}
              animate={{ opacity: isDesktopLayout ? 1 : 0.25, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1, x: 90 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={vector}
                alt=""
                className="absolute inset-0 w-full h-full object-cover will-change-transform"
                animate={{
                  x: [0, 28, 0, -28, 0],
                  y: [0, -12, 0, 12, 0],
                  scale: [1, 1.06, 1, 1.06, 1],
                  rotate: [0, 0.7, 0, -0.7, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div
              className={`absolute inset-0 ${isDesktopLayout ? "bg-black/85 backdrop-blur-md" : "bg-[#0A0A0A]/50 backdrop-blur-[25px]"}`}
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {isDesktopLayout ? desktopPanel : mobilePanel}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  // Portal to <body>: the nav wrapper that renders this modal is transformed while the
  // scrolled nav container is visible, which would otherwise re-anchor position: fixed.
  if (typeof document === "undefined") return null
  return createPortal(overlays, document.body)
}

export default ContactModal
