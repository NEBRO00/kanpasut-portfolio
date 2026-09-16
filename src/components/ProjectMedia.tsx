import { useState } from 'react'

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov']

export interface MediaSlot {
  // path to a file in /public — e.g. '/projects/hayday-1.jpg' or
  // '/projects/hayday-1.mp4'. Detected as image or video by its extension.
  src: string
  // shown instead if the file at `src` doesn't exist yet / fails to load
  fallbackColor: string
}

export default function ProjectMedia({ src, fallbackColor, className = '' }: MediaSlot & { className?: string }) {
  const [failed, setFailed] = useState(false)
  const isVideo = VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext))

  if (failed) {
    return <div className={className} style={{ background: fallbackColor }} />
  }

  if (isVideo) {
    return (
      <video
        className={`block h-full w-full object-cover ${className}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
      >
        <source src={src} />
      </video>
    )
  }

  return (
    <img
      src={src}
      alt=""
      className={`block h-full w-full object-cover ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
