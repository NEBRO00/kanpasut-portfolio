import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useScrollDirection } from '../hooks/useScrollDirection'

const sections = [
  { id: 'about', key: 'about' as const },
  { id: 'skills', key: 'skills' as const },
  { id: 'projects', key: 'projects' as const },
  { id: 'experience', key: 'experience' as const },
]

export default function Header() {
  const { t, lang, toggleLang } = useLanguage()
  const { hidden, scrolled } = useScrollDirection()
  const [open, setOpen] = useState(false)

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{ y: hidden && !open ? '-100%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`mx-3 mt-3 flex items-center justify-between rounded-2xl border px-5 py-3 transition-colors duration-500 sm:mx-6 sm:mt-4 sm:px-8 ${
          scrolled ? 'glass border-fog/10' : 'border-transparent bg-transparent'
        }`}
      >
        <button
          onClick={() => scrollTo('hero')}
          className="font-kanit text-sm font-semibold tracking-wide text-fog"
        >
          KANPASUT<span className="text-steel">.</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="group relative font-kanit text-sm text-fog/80 transition-opacity hover:opacity-100"
            >
              {t.nav[s.key]}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-fog transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            aria-label={t.langToggleLabel}
            className="flex items-center gap-1 font-kanit text-xs font-medium tracking-wider"
          >
            <span className={lang === 'th' ? 'text-fog' : 'text-steel transition-colors hover:text-fog'}>TH</span>
            <span className="text-steel">|</span>
            <span className={lang === 'en' ? 'text-fog' : 'text-steel transition-colors hover:text-fog'}>EN</span>
          </button>

          <button
            className="text-fog md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-3 mt-2 overflow-hidden rounded-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="rounded-xl px-3 py-3 text-left font-kanit text-base text-fog/90 transition-colors hover:bg-white/5"
                >
                  {t.nav[s.key]}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
