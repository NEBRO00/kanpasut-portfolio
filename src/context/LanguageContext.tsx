import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import { content, type Lang } from '../data/content'

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
  setLang: (l: Lang) => void
  t: typeof content['th']
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('th')

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      toggleLang: () => setLang((prev) => (prev === 'th' ? 'en' : 'th')),
      setLang,
      t: content[lang],
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
