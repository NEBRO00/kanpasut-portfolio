import { useEffect, useRef } from 'react'

// The source video's backdrop is a light, near-neutral gray/white (brightness
// ~210+, very low saturation). Rather than keying every pixel that merely
// *looks* like that color, we flood-fill from the frame's outer edges
// through connected background-colored pixels only. That's what keeps a
// bright highlight on the cat's nose (which matches the same brightness/
// saturation test but is surrounded by fur, not connected to the border)
// from getting punched into a hole — plain per-pixel thresholding did
// exactly that.
const BRIGHTNESS_THRESHOLD = 210
const MAX_SATURATION_FOR_KEY = 24

const WIDTH = 240
const HEIGHT = 427 // matches the source video's ~9:16 aspect ratio

export default function CatRunnerCanvas({ className = '' }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    let cancelled = false
    const pixelCount = WIDTH * HEIGHT
    const isBg = new Uint8Array(pixelCount)
    const visited = new Uint8Array(pixelCount)
    const stack = new Int32Array(pixelCount)

    const drawFrame = () => {
      if (cancelled) return
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, WIDTH, HEIGHT)
        const frame = ctx.getImageData(0, 0, WIDTH, HEIGHT)
        const data = frame.data

        // classify every pixel as "background-colored" or not
        for (let idx = 0; idx < pixelCount; idx++) {
          const i = idx * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const brightness = (r + g + b) / 3
          const sat = Math.max(r, g, b) - Math.min(r, g, b)
          isBg[idx] = sat <= MAX_SATURATION_FOR_KEY && brightness >= BRIGHTNESS_THRESHOLD ? 1 : 0
          visited[idx] = 0
        }

        // flood-fill from the border, through background-colored pixels only
        let sp = 0
        const seed = (idx: number) => {
          if (isBg[idx] && !visited[idx]) {
            visited[idx] = 1
            stack[sp++] = idx
          }
        }
        for (let x = 0; x < WIDTH; x++) {
          seed(x)
          seed((HEIGHT - 1) * WIDTH + x)
        }
        for (let y = 0; y < HEIGHT; y++) {
          seed(y * WIDTH)
          seed(y * WIDTH + WIDTH - 1)
        }
        while (sp > 0) {
          const idx = stack[--sp]
          const x = idx % WIDTH
          const y = (idx / WIDTH) | 0
          if (x > 0 && isBg[idx - 1] && !visited[idx - 1]) {
            visited[idx - 1] = 1
            stack[sp++] = idx - 1
          }
          if (x < WIDTH - 1 && isBg[idx + 1] && !visited[idx + 1]) {
            visited[idx + 1] = 1
            stack[sp++] = idx + 1
          }
          if (y > 0 && isBg[idx - WIDTH] && !visited[idx - WIDTH]) {
            visited[idx - WIDTH] = 1
            stack[sp++] = idx - WIDTH
          }
          if (y < HEIGHT - 1 && isBg[idx + WIDTH] && !visited[idx + WIDTH]) {
            visited[idx + WIDTH] = 1
            stack[sp++] = idx + WIDTH
          }
        }

        for (let idx = 0; idx < pixelCount; idx++) {
          if (visited[idx]) data[idx * 4 + 3] = 0
        }

        ctx.putImageData(frame, 0, 0)
      }
      rafRef.current = requestAnimationFrame(drawFrame)
    }

    rafRef.current = requestAnimationFrame(drawFrame)
    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className={`relative z-10 ${className}`}>
      <video ref={videoRef} className="hidden" autoPlay muted loop playsInline preload="auto">
        <source src="/loader-cat.webm" type="video/webm" />
        <source src="/loader-cat.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="h-56 w-auto sm:h-64" />
    </div>
  )
}
