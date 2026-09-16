import { useLanguage } from '../context/LanguageContext'
import { links } from '../data/content'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-fog/10 bg-ink px-5 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 font-kanit text-xs text-fog/50 sm:flex-row">
        <p>
          © {year} Kanpasut Sangthong — {t.footer.rights}
        </p>
        <div className="flex items-center gap-5">
          <a href={links.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-fog">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
