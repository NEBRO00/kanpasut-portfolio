import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react'
import { portrait } from '../data/content'

const FEATHER = 60 // px — softness of the reveal edge
const RADIUS = 130 // px — reveal circle radius on desktop
const RADIUS_TOUCH = 100 // px — slightly smaller on touch screens

function maskFor(x: number, y: number, radius: number, active: boolean) {
  const r = active ? radius : 0
  const inner = Math.max(r - FEATHER, 0)
  return `radial-gradient(circle at ${x}% ${y}%, black 0, black ${inner}px, transparent ${r}px)`
}

export default function PortraitReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [reveal, setReveal] = useState({ x: 50, y: 42, active: false })
  const [magnet, setMagnet] = useState({ x: 0, y: 0 })
  const [isCoarse, setIsCoarse] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsCoarse(coarse)

    if (!coarse || reducedMotion) return

    // mobile / touch: gently auto-sweep the reveal circle once on load so the
    // effect is visible without requiring the user to know to touch it
    const start = performance.now()
    const duration = 3400

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const angle = t * Math.PI * 2.2
      const x = 50 + Math.cos(angle) * 26
      const y = 42 + Math.sin(angle) * 20
      setReveal({ x, y, active: true })
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setReveal((r) => ({ ...r, active: false }))
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const updateFromPoint = (clientX: number, clientY: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = ((clientX - rect.left) / rect.width) * 100
    const py = ((clientY - rect.top) / rect.height) * 100
    setReveal({ x: px, y: py, active: true })

    const cx = (clientX - rect.left - rect.width / 2) / rect.width
    const cy = (clientY - rect.top - rect.height / 2) / rect.height
    setMagnet({ x: cx * 14, y: cy * 14 })
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => updateFromPoint(e.clientX, e.clientY)
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    if (touch) updateFromPoint(touch.clientX, touch.clientY)
  }

  const reset = () => {
    setMagnet({ x: 0, y: 0 })
    setReveal((r) => ({ ...r, active: false }))
  }

  const radius = isCoarse ? RADIUS_TOUCH : RADIUS
  const mask = maskFor(reveal.x, reveal.y, radius, reveal.active)

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={reset}
      className="relative h-full w-full touch-none overflow-hidden rounded-xl3 border border-fog/10"
      style={{
        transform: `translate3d(${magnet.x}px, ${magnet.y}px, 0)`,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* base photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${portrait.base}), radial-gradient(ellipse 70% 60% at 50% 38%, #2c2c31 0%, #1a1a1d 60%, #101011 100%)`,
          backgroundSize: 'cover, auto',
          backgroundPosition: 'center, center',
        }}
      />

      {/* reveal photo — swaps in through a feathered circular mask */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${portrait.reveal}), radial-gradient(ellipse 70% 60% at 50% 38%, #4a3a6e 0%, #253552 60%, #12161c 100%)`,
          backgroundSize: 'cover, auto',
          backgroundPosition: 'center, center',
          WebkitMaskImage: mask,
          maskImage: mask,
          transition: reveal.active ? 'none' : 'mask-image 0.35s ease-out, -webkit-mask-image 0.35s ease-out',
        }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-xl3 ring-1 ring-inset ring-white/5" />
    </div>
  )
}
