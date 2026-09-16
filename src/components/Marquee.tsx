import { projects } from '../data/content'
import ProjectMedia from './ProjectMedia'

const tiles = [...projects, ...projects, ...projects]

function Row({ direction, offset = 0 }: { direction: 'left' | 'right'; offset?: number }) {
  return (
    <div className="scrollbar-none flex w-max gap-4 overflow-hidden">
      <div
        className={`flex gap-4 ${direction === 'left' ? 'motion-safe:animate-marquee-left' : 'motion-safe:animate-marquee-right'}`}
        style={{ animationDelay: `${offset}s` }}
      >
        {tiles.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="relative flex h-32 w-56 shrink-0 items-end overflow-hidden rounded-2xl border border-fog/10 sm:h-40 sm:w-72"
          >
            <ProjectMedia
              src={p.media[0].src}
              fallbackColor={p.media[0].fallbackColor}
              className="absolute inset-0"
            />
            <span className="relative z-10 w-full truncate bg-gradient-to-t from-black/60 to-transparent px-4 py-3 font-kanit text-xs text-white/90">
              {p.title.th}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="relative overflow-hidden bg-ink py-10 sm:py-14">
      <div className="grain absolute inset-0" />
      <div className="relative z-10 flex flex-col gap-4">
        <Row direction="right" />
        <Row direction="left" offset={-6} />
      </div>
    </section>
  )
}
