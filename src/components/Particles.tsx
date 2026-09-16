import { useMemo } from 'react'

export default function Particles({ count = 24 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        duration: 10 + Math.random() * 14,
        delay: -Math.random() * 20,
      })),
    [count]
  )

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-fog/40 motion-safe:animate-drift"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
