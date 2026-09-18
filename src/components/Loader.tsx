import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CatRunnerCanvas from './CatRunnerCanvas'

const DURATION = 4800 // ms — how long the splash stays up before fading out

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
    }, DURATION)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-9 overflow-hidden bg-ink"
        >
          <div className="grain absolute inset-0" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 42%, rgba(139,124,246,0.18), transparent 55%)',
            }}
          />

          <p className="gradient-text relative z-10 max-w-xs text-balance text-center font-kanit text-2xl font-bold leading-snug sm:text-3xl">
            รอสักครู่นะคร้าบ กำลังจัด Resume ให้ค้าบ
          </p>

          {/* running character — the source video's light background is keyed
              out to transparent, frame by frame, on a canvas (see
              CatRunnerCanvas.tsx). It's an approximation, not a perfect
              matte — very bright highlights on the character can thin out
              slightly — but no box/edge/backdrop shows anymore. */}
          <CatRunnerCanvas />

          <div className="relative z-10 h-1 w-40 overflow-hidden rounded-full bg-fog/10">
            <div className="h-full rounded-full bg-gradient-to-r from-glow-violet via-glow-blue to-glow-rose animate-loader-bar" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
