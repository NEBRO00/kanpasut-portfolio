import { useEffect, useRef, useState } from 'react'

export function useScrollDirection(threshold = 8) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const diff = y - lastY.current

      setScrolled(y > 40)

      if (y < 80) {
        setHidden(false)
      } else if (Math.abs(diff) > threshold) {
        setHidden(diff > 0)
        lastY.current = y
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { hidden, scrolled }
}
