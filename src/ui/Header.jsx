import { useCallback, useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const Header = ({ header, centered = false, Line = true }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.6 })
    const [text, setText] = useState("")
    const intervalRef = useRef(null)
    const progressRef = useRef(0)
    const hasStarted = useRef(false)

    // const stop = useCallback(() => {
    //     if (intervalRef.current) {
    //         clearInterval(intervalRef.current)
    //         intervalRef.current = null
    //     }
    //     progressRef.current = 0
    //     setText(header)
    // }, [header])

    const start = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        progressRef.current = 0
        setText("")

        intervalRef.current = setInterval(() => {
            const p = progressRef.current
            const typedCount = Math.min(header.length, Math.floor(p) + 1)
            const lockedCount = Math.max(0, p - 1.35)
            const slice = header.slice(0, typedCount)

            setText(
                slice
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " "
                        if (i < lockedCount) return header[i]
                        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                    })
                    .join("")
            )

            if (p >= header.length + 1.35) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
                setText(header)
                return
            }

            progressRef.current += 0.38
        }, 28)
    }, [header])

    useEffect(() => {
        if (isInView && !hasStarted.current) {
            hasStarted.current = true
            start()
        }
    }, [isInView, start])

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    return (
        <span
            ref={ref}
            className={`text-[12px] text-[#ff6467] uppercase leading-4 tracking-[3.60px] flex items-center gap-3 w-full ${centered ? "text-center mx-auto justify-center" : ""}`}
        >
            {Line && <span className="bg-[#ff0033] h-px w-8 block"></span>}
            {text}
            {(centered && Line) ? (
                <span className="bg-[#ff0033] h-px w-8 block"></span>
            ) : ""}
        </span>
    )
}

export default Header