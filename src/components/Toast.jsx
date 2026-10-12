import { motion, AnimatePresence } from "framer-motion"

const Toast = ({ open, type = "success", title, message, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed top-6 right-6 z-[200] w-[min(92vw,420px)]"
          initial={{ opacity: 0, x: 40, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          <div
            className={`relative overflow-hidden border ${type === "error"
                ? "border-[#FF0033] bg-[#FF0033]"
                : "border-[#FF0033]/40 bg-[#1a0508]"
              }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 78%, 92% 100%, 0 100%)",
            }}
          >
            <div className="flex items-stretch">
              <div className={`w-1.5 ${type === "error" ? "bg-black/40" : "bg-[#FF0033]"}`} />
              <div className="flex-1 px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4
                      className={`text-sm font-black uppercase tracking-wide ${type === "error" ? "text-white" : "text-[#FF0033]"
                        }`}
                    >
                      {title}
                    </h4>
                    <p
                      className={`mt-1 text-xs ${type === "error" ? "text-white/90" : "text-white/70"
                        }`}
                    >
                      {message}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-white/60 hover:text-white text-sm leading-none"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast