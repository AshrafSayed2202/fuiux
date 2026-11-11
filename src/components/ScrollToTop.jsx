import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// On every route change: scroll to the section named by the hash when there is one
// (nav menu / footer links such as "/#about"), otherwise to the top of the page.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) {
      // let the new page lay out before measuring the section
      const frame = requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      )
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
