import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Code2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { projects, type Project } from '../data/content'
import ProjectMedia from './ProjectMedia'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.6])

  return (
    <div ref={ref} className="sticky top-20 sm:top-24" style={{ zIndex: index + 1 }}>
      <motion.div
        style={{ scale, opacity }}
        className="mx-auto mb-8 w-full max-w-5xl overflow-hidden rounded-xl3 border border-fog/15 bg-panel"
      >
        <div className="grid gap-0 sm:grid-cols-[1fr_1.1fr]">
          <div className="grid grid-cols-2 grid-rows-2 gap-2 p-3 sm:gap-3 sm:p-4">
            {project.media.map((m, i) => (
              <ProjectMedia key={i} src={m.src} fallbackColor={m.fallbackColor} className="aspect-square rounded-2xl" />
            ))}
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9">
            <div className="flex items-center gap-3 font-kanit text-xs text-steel">
              <span>{project.order}</span>
              <span className="h-px w-6 bg-steel/40" />
              <span className="uppercase tracking-wide">{project.type[lang]}</span>
            </div>
            <h3 className="mt-3 font-kanit text-2xl font-bold text-fog sm:text-3xl">{project.title[lang]}</h3>
            <p className="mt-3 font-kanit text-sm leading-relaxed text-fog/70 sm:text-base">
              {project.description[lang]}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-fog/15 px-3 py-1 font-kanit text-xs text-fog/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-kanit text-xs uppercase tracking-wide text-steel">Role</dt>
                <dd className="mt-1 font-kanit text-sm text-fog/80">{project.role[lang]}</dd>
              </div>
              <div>
                <dt className="font-kanit text-xs uppercase tracking-wide text-steel">Result</dt>
                <dd className="mt-1 font-kanit text-sm text-fog/80">{project.result[lang]}</dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-fog/25 px-5 py-2.5 font-kanit text-sm text-fog transition-colors hover:border-fog/60"
              >
                {t.projects.liveProject}
                <ArrowUpRight size={14} />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-fog/25 px-5 py-2.5 font-kanit text-sm text-fog transition-colors hover:border-fog/60"
              >
                <Code2 size={14} />
                {t.projects.viewCode}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="grain absolute inset-0" />
      <div className="perspective-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(91,141,239,0.12), transparent 55%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-text mb-16 font-kanit font-black uppercase leading-none"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
        >
          {t.projects.heading}
        </motion.h2>

        <div className="flex flex-col gap-24 sm:gap-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
