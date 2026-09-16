import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { experience, education } from '../data/content'

export default function Experience() {
  const { t, lang } = useLanguage()

  return (
    <section id="experience" className="relative bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 font-kanit font-black uppercase leading-none"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)' }}
        >
          {t.experience.heading}
        </motion.h2>
        <p className="mb-12 font-kanit text-sm text-ink/50">{t.experience.noExperienceNote}</p>

        <div className="flex flex-col">
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-[auto_1fr] gap-6 border-t border-ink/10 py-8 sm:gap-10"
            >
              <span className="font-kanit text-4xl font-black text-ink/10 sm:text-6xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-kanit text-xl font-semibold sm:text-2xl">{item.role[lang]}</h3>
                  <span className="font-kanit text-sm text-ink/50">{item.period[lang]}</span>
                </div>
                <p className="mt-1 font-kanit text-sm text-ink/60">{item.org[lang]}</p>
                <p className="mt-4 max-w-xl font-kanit text-base leading-relaxed text-ink/75">{item.summary[lang]}</p>
                <p className="mt-2 max-w-xl font-kanit text-sm leading-relaxed text-ink/55">{item.outcome[lang]}</p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-ink/10" />
        </div>

        <h3 className="mb-8 mt-16 font-kanit text-2xl font-black uppercase sm:text-3xl">
          {t.experience.educationHeading}
        </h3>
        <div className="flex flex-col">
          {education.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-[auto_1fr] gap-6 border-t border-ink/10 py-6 sm:gap-10"
            >
              <span className="font-kanit text-3xl font-black text-ink/10 sm:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h4 className="font-kanit text-lg font-semibold sm:text-xl">{item.school[lang]}</h4>
                <p className="mt-1 font-kanit text-sm text-ink/60">{item.field[lang]}</p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  )
}
