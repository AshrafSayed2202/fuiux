import { useEffect, useState } from "react"
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

const ContactModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({ open: false, type: "success", title: "", message: "" })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      const t = setTimeout(() => {
        setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" })
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
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" })
      setTimeout(() => onClose?.(), 600)
    } catch {
      showToast("error", "Error", "Something went wrong. Please try again in a moment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
              <div className="absolute inset-0 flex flex-col px-16 pointer-events-none">
                <h3 className="text-xl font-bold text-white leading-tight pt-1">{toast.title}</h3>
                <p className="mt-1.5 text-[16px] text-white/80 text-nowrap pt-3">{toast.message}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <img src={vector} alt="Vector" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div 
              className="w-206.25 h-153.5 relative"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute">
                <ContactBorders />
              </div>
              <div className="absolute right-[1.5%] top-[5%]">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex cursor-pointer   absolute right-[12%] top-[10%] items-center justify-center text-white"
                  aria-label="Close"
                >
                  <span className="text-3xl font-bold leading-none">✕</span>
                </button>
                <ContactXContainer />
              </div>
              <div className="absolute left-[6%] top-[6.5%]">
                <div className="flex-1 px-6 py-4 absolute left-[5%]">
                  <h2 className="text-2xl font-bold text-white">Let’s Contact</h2>
                  <p className="mt-1.5 text-base text-white/60">
                    Get in touch with us and let our Combined creativity shine.
                  </p>
                </div>
                <ContactHeaderBg />
              </div>
              <div className="absolute left-[4.75%] top-[17.5%]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-12 absolute w-full mt-10">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <div className="absolute select-none z-1">
                        <ContactInput1 error={!!errors.firstName} />
                      </div>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className={`w-full px-8 py-3 text-sm relative z-2 text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#FF0033] ${errors.firstName ? "border-[#FF0033]" : "border-[#ffffff14]"}`}
                      />
                      {errors.firstName && (
                        <div className="absolute right-4 top-1/2 translate-y-[-25%] z-3 pointer-events-none">
                          <InputErrorIcon />
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute select-none z-1">
                        <ContactInput1 error={!!errors.lastName} />
                      </div>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className={`w-full px-8 py-3 text-sm relative z-2 text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#FF0033] ${errors.lastName ? "border-[#FF0033]" : "border-[#ffffff14]"}`}
                      />
                      {errors.lastName && (
                        <div className="absolute right-4 top-1/2 translate-y-[-25%] z-3 pointer-events-none">
                          <InputErrorIcon />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute select-none z-1">
                      <ContactInput2 error={!!errors.email} />
                    </div>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`w-full px-8 py-3 text-sm relative z-2 text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#FF0033] ${errors.email ? "border-[#FF0033]" : "border-[#ffffff14]"}`}
                    />
                    {errors.email && (
                      <div className="absolute right-4 top-1/2 translate-y-[-25%] z-3 pointer-events-none">
                        <InputErrorIcon />
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute select-none z-1">
                      <ContactInput2 />
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="w-full px-8 py-3 text-sm relative z-2 text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#FF0033]"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute select-none z-1">
                      <ContactTextarea error={!!errors.message} />
                    </div>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Message"
                      rows={4}
                      className={`w-full resize-none px-4 py-3 text-sm relative z-2 text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#FF0033] ${errors.message ? "border-[#FF0033]" : "border-[#ffffff14]"}`}
                    />
                    {errors.message && (
                      <div className="absolute right-4 top-4 z-3 pointer-events-none">
                        <InputErrorIcon />
                      </div>
                    )}
                  </div>

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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ContactModal