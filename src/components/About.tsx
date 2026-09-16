import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const corners = [
  { className: 'left-6 top-16 sm:left-16', color: '#8B7CF6', from: { x: -40, y: -40 } },
  { className: 'right-6 top-24 sm:right-20', color: '#5B8DEF', from: { x: 40, y: -40 } },
  { className: 'bottom-24 left-10 sm:left-24', color: '#F2A25C', from: { x: -40, y: 40 } },
  { className: 'bottom-16 right-8 sm:right-16', color: '#F2748C', from: { x: 40, y: 40 } },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative flex min-h-screen items-center overflow-hidden bg-ink py-28">
      <div className="grain absolute inset-0" />

      {corners.map((c, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute h-40 w-40 rounded-full sm:h-56 sm:w-56 ${c.className}`}
          style={{ background: c.color, filter: 'blur(70px)', opacity: 0.28 }}
          initial={{ opacity: 0, x: c.from.x, y: c.from.y }}
          whileInView={{ opacity: 0.28, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-text mb-10 font-kanit font-black uppercase leading-none"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
        >
          {t.about.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-balance font-kanit text-lg leading-relaxed text-fog/80 sm:text-xl"
        >
          {t.about.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-5"
        >
          {[
            { label: t.about.workStatusLabel, value: t.hero.status },
            { label: t.about.locationLabel, value: t.about.location },
            { label: t.about.workPrefLabel, value: t.hero.workPreference },
            { label: t.about.thaiLabel, value: t.about.thaiLevel },
            { label: t.about.englishLabel, value: t.about.englishLevel },
          ].map((item) => (
            <div key={item.label} className="border-t border-fog/10 pt-3">
              <p className="font-kanit text-xs text-steel">{item.label}</p>
              <p className="mt-1 font-kanit text-sm text-fog">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
