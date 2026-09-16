import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MessageCircle, Code2, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { links } from '../data/content'

export default function FloatingContact() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const items = [
    { icon: Mail, label: links.email, href: `mailto:${links.email}` },
    { icon: Phone, label: links.phone, href: `tel:${links.phone.replace(/-/g, '')}` },
    { icon: MessageCircle, label: `Line: ${links.line}`, href: `https://line.me/ti/p/~${links.line}` },
    { icon: Code2, label: 'GitHub', href: links.github },
  ]

  return (
    <div className="fixed bottom-6 right-4 z-40 sm:bottom-8 sm:right-8">
      <div className="relative flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="glass w-64 rounded-2xl p-4"
            >
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-fog/90 transition-colors hover:text-fog"
                    >
                      <item.icon size={16} className="shrink-0 text-mist" />
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-br from-glow-violet via-glow-blue to-glow-rose px-6 py-3 font-kanit text-sm font-medium text-ink shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_24px_-8px_rgba(139,124,246,0.6)] transition-transform hover:scale-105 active:scale-95"
        >
          {open ? <X size={16} /> : <Mail size={16} />}
          {t.hero.contactMe}
        </button>
      </div>
    </div>
  )
}
