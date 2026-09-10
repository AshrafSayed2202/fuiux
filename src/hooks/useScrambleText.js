/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useRef, useState } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#*</>+"

export function useScrambleText(target, speed = 32, step = 0.4) {
  const [text, setText] = useState(target)
  const intervalRef = useRef(null)
  const iterationRef = useRef(0)
  const targetRef = useRef(target)

  useEffect(() => {
    targetRef.current = target
    setText(target)
  }, [target])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    iterationRef.current = 0
    setText(targetRef.current)
  }, [])

  const start = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    iterationRef.current = 0
    const original = targetRef.current

    intervalRef.current = setInterval(() => {
      const iter = iterationRef.current
      setText(
        original
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < iter) return original[i]
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join("")
      )
      if (iter >= original.length) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setText(original)
        return
      }
      iterationRef.current += step
    }, speed)
  }, [speed, step])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return { text, start, stop }
}