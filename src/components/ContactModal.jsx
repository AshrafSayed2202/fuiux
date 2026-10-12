import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CardBorders from "../ui/CardBorders"
import Toast from "./Toast"

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
      showToast("error", "Error", "Please fill in all required fields.")
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
      <Toast
        open={toast.open}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-[540px] bg-[#0A0A0A]/95 border border-[#FF0033]/40 shadow-[0_0_40px_rgba(255,0,51,0.25)]"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute -top-px -left-px h-6 w-6 border-t-2 border-l-2 border-[#FF0033]" />
              <div className="pointer-events-none absolute -top-px -right-px h-6 w-6 border-t-2 border-r-2 border-[#FF0033]" />
              <div className="pointer-events-none absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-[#FF0033]" />
              <div className="pointer-events-none absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-[#FF0033]" />

              <div className="relative flex items-stretch border-b border-[#FF0033]/30 bg-linear-to-r from-[#FF0033]/15 via-[#FF0033]/5 to-transparent">
                <div className="flex-1 px-6 py-4">
                  <h2 className="text-xl font-black tracking-tight text-white">Let’s Contact</h2>
                  <p className="mt-1 text-xs text-white/60">
                    Get in touch with us and let our Combined creativity shine.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex w-14 items-center justify-center border-l border-[#FF0033]/40 bg-[#FF0033] text-white transition-colors hover:bg-[#ff1a4a]"
                  aria-label="Close"
                >
                  <span className="text-lg font-bold leading-none">✕</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className={`w-full bg-[#ffffff08] border px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#FF0033] ${errors.firstName ? "border-[#FF0033]" : "border-[#ffffff14]"
                        }`}
                    />
                    {errors.firstName && (
                      <span className="mt-1 block text-[10px] text-[#FF0033]">{errors.firstName}</span>
                    )}
                  </div>
                  <div>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className={`w-full bg-[#ffffff08] border px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#FF0033] ${errors.lastName ? "border-[#FF0033]" : "border-[#ffffff14]"
                        }`}
                    />
                    {errors.lastName && (
                      <span className="mt-1 block text-[10px] text-[#FF0033]">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={`w-full bg-[#ffffff08] border px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#FF0033] ${errors.email ? "border-[#FF0033]" : "border-[#ffffff14]"
                      }`}
                  />
                  {errors.email && (
                    <span className="mt-1 block text-[10px] text-[#FF0033]">{errors.email}</span>
                  )}
                </div>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full bg-[#ffffff08] border border-[#ffffff14] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#FF0033]"
                />

                <div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={4}
                    className={`w-full resize-none bg-[#ffffff08] border px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#FF0033] ${errors.message ? "border-[#FF0033]" : "border-[#ffffff14]"
                      }`}
                  />
                  {errors.message && (
                    <span className="mt-1 block text-[10px] text-[#FF0033]">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative mt-2 w-full overflow-hidden bg-[#FF0033] py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#ff1a4a] disabled:opacity-60"
                >
                  <span className="absolute -left-4 -bottom-4 h-8 w-8 rotate-45 bg-[#0A0A0A]" />
                  <span className="absolute -right-4 -top-4 h-8 w-8 rotate-45 bg-[#0A0A0A]" />
                  {isSubmitting ? "Sending..." : "Send it to make a game"}
                  <CardBorders byHover={false} active={false} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ContactModal