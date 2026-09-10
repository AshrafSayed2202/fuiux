/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useRef, useState } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#*</>+"
const soundCache = new Map()

function playSound(src, volume = 0.45) {
  if (typeof window === "undefined" || !src) return
  let base = soundCache.get(src)
  if (!base) {
    base = new Audio(src)
    base.preload = "auto"
    soundCache.set(src, base)
  }
  const node = base.cloneNode()
  node.volume = volume
  node.play().catch(() => { })
}

export function useScrambleText(target, speedOrOptions = 28, stepArg = 0.38) {
  const options =
    typeof speedOrOptions === "object" && speedOrOptions !== null
      ? {
        speed: speedOrOptions.speed ?? 28,
        step: speedOrOptions.step ?? 0.38,
        hoverSound: speedOrOptions.hoverSound,
        clickSound: speedOrOptions.clickSound,
        volume: speedOrOptions.volume ?? 0.45,
      }
      : {
        speed: speedOrOptions ?? 28,
        step: stepArg ?? 0.38,
        hoverSound: undefined,
        clickSound: undefined,
        volume: 0.45,
      }

  const [text, setText] = useState(target)
  const intervalRef = useRef(null)
  const progressRef = useRef(0)
  const targetRef = useRef(target)
  const optionsRef = useRef(options)

  useEffect(() => {
    targetRef.current = target
    setText(target)
  }, [target])

  useEffect(() => {
    optionsRef.current = options
    if (options.hoverSound) playSound(options.hoverSound, 0)
    if (options.clickSound) playSound(options.clickSound, 0)
  }, [options.hoverSound, options.clickSound, options.speed, options.step, options.volume, options])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    progressRef.current = 0
    setText(targetRef.current)
  }, [])

  const start = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    const { speed, step, hoverSound, volume } = optionsRef.current
    playSound(hoverSound, volume)
    progressRef.current = 0
    const original = targetRef.current
    setText("")

    intervalRef.current = setInterval(() => {
      const p = progressRef.current
      const typedCount = Math.min(original.length, Math.floor(p) + 1)
      const lockedCount = Math.max(0, p - 1.35)
      const slice = original.slice(0, typedCount)

      setText(
        slice
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < lockedCount) return original[i]
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join("")
      )

      if (p >= original.length + 1.35) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setText(original)
        return
      }

      progressRef.current += step
    }, speed)
  }, [])

  const click = useCallback(() => {
    const { clickSound, volume } = optionsRef.current
    playSound(clickSound, volume)
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return { text, start, stop, click }
}