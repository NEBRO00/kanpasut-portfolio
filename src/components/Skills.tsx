import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { skillGroups } from '../data/content'

export default function Skills() {
  const { t, lang } = useLanguage()

  return (
    <section id="skills" className="relative -mt-10 rounded-t-xl3 bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 font-kanit font-black uppercase leading-none text-ink"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
        >
          {t.skills.heading}
        </motion.h2>

        <div className="flex flex-col">
          {skillGroups.map((group, gi) => (
            <div key={group.number} className="border-t border-ink/10 py-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-10">
                <span className="font-kanit text-sm text-ink/40">{group.number}</span>
                <h3 className="w-full max-w-[220px] shrink-0 font-kanit text-xl font-semibold sm:text-2xl">
                  {group.title[lang]}
                </h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {group.items.map((item, ii) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.4, delay: gi * 0.05 + ii * 0.05 }}
                      className="font-kanit text-base text-ink/70"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  )
}
