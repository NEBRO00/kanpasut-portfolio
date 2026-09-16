import { useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { links } from '../data/content'
import Blob from './Blob'
import Particles from './Particles'
import PortraitReveal from './PortraitReveal'

export default function Hero() {
  const { t } = useLanguage()
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const handleSceneMove = (e: MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window
    const relX = (e.clientX / innerWidth - 0.5) * 2
    const relY = (e.clientY / innerHeight - 0.5) * 2
    setParallax({ x: relX * 18, y: relY * 18 })
  }

  return (
    <section
      id="hero"
      onMouseMove={handleSceneMove}
      className="relative flex min-h-screen w-full flex-col bg-ink"
    >
      {/* background depth — contained to this wrapper so it never clips the text content above */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="grain absolute inset-0" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(139,124,246,0.16), transparent 45%), radial-gradient(circle at 80% 30%, rgba(91,141,239,0.14), transparent 45%), radial-gradient(circle at 50% 90%, rgba(242,116,140,0.10), transparent 50%)',
          }}
        />
        <Blob color="#8B7CF6" size={420} className="-left-32 top-10" parallax={parallax} />
        <Blob color="#5B8DEF" size={360} className="right-[-8rem] top-1/3" parallax={{ x: -parallax.x, y: parallax.y }} delay={0.2} />
        <Blob color="#F2A25C" size={280} className="bottom-[-6rem] left-1/3" parallax={{ x: parallax.x * 0.6, y: -parallax.y * 0.6 }} delay={0.4} />
        <Particles count={26} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 pt-24 sm:px-8 lg:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* portrait — shown above text on mobile, beside it on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[220px] sm:max-w-xs lg:order-2 lg:max-w-sm"
          >
            <PortraitReveal />
          </motion.div>

          <div className="lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-kanit text-sm font-medium tracking-[0.2em] text-mist"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-text font-kanit font-black uppercase leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(3.2rem, 14vw, 11rem)' }}
            >
              {t.hero.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex flex-wrap items-center gap-3"
            >
              <span className="font-kanit text-xl font-medium text-fog sm:text-2xl">{t.hero.role}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-fog/15 bg-white/5 px-3 py-1 font-kanit text-xs text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-glow-amber" />
                {t.hero.status} · {t.hero.workPreference}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-md text-balance font-kanit text-base leading-relaxed text-fog/70 sm:text-lg"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full bg-fog px-7 py-3 font-kanit text-sm font-medium text-ink transition-transform hover:scale-105 active:scale-95"
              >
                {t.hero.viewProjects}
              </button>
              <a
                href={links.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-fog/25 px-7 py-3 font-kanit text-sm font-medium text-fog transition-colors hover:border-fog/60"
              >
                <Download size={15} />
                {t.hero.downloadResume}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 mx-auto mb-8 flex items-center gap-2 text-mist motion-safe:animate-drift"
      >
        <ArrowDown size={16} />
      </motion.div>
    </section>
  )
}
