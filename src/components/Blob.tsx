import { motion } from 'framer-motion'

interface BlobProps {
  color: string
  size: number
  className?: string
  parallax?: { x: number; y: number }
  delay?: number
}

export default function Blob({ color, size, className = '', parallax, delay = 0 }: BlobProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full motion-safe:animate-drift-slow ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: 'blur(80px)',
        opacity: 0.35,
        transform: parallax ? `translate3d(${parallax.x}px, ${parallax.y}px, 0)` : undefined,
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.35, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}
