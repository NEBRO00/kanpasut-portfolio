// A hand-built SVG "cat courier" — cute, cat-eared, wearing a tiny vest and tie,
// mid-run, holding a document. Every moving part (legs, arms, tail, paper) is
// its own <g> that rotates around an explicit pivot point set via inline
// transform-origin, so limbs stay visually attached to the body instead of
// floating off on their own.

const FOG = '#D7E2EA'
const MIST = '#BBCCD7'
const INK = '#0C0C0C'
const PAPER = '#EDE7DD'
const TIE = '#F2748C'

export default function CatRunner({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 150"
      width="96"
      height="144"
      className={`motion-safe:animate-body-bounce ${className}`}
      aria-hidden="true"
    >
      {/* tail */}
      <g style={{ transformOrigin: '63px 82px' }} className="motion-safe:animate-tail-wag">
        <path
          d="M63,82 Q82,80 84,60 Q85,49 77,44"
          stroke={FOG}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* back leg */}
      <g style={{ transformOrigin: '42px 84px' }} className="motion-safe:animate-run-leg-back">
        <rect x="38" y="84" width="8" height="32" rx="4" fill={MIST} />
        <ellipse cx="42" cy="118" rx="6" ry="4" fill={INK} opacity="0.55" />
      </g>

      {/* back arm */}
      <g style={{ transformOrigin: '37px 50px' }} className="motion-safe:animate-run-leg-front">
        <rect x="33" y="48" width="7" height="24" rx="3.5" fill={MIST} />
        <circle cx="36.5" cy="74" r="4" fill={MIST} />
      </g>

      {/* body, wearing a little vest + tie */}
      <rect x="36" y="40" width="28" height="46" rx="14" fill={FOG} />
      <path d="M40,44 L50,50 L46,60 Z" fill={INK} opacity="0.85" />
      <path d="M60,44 L50,50 L54,60 Z" fill={INK} opacity="0.85" />
      <path d="M48,50 L52,50 L53,68 L50,74 L47,68 Z" fill={TIE} />

      {/* front leg */}
      <g style={{ transformOrigin: '58px 84px' }} className="motion-safe:animate-run-leg-front">
        <rect x="54" y="84" width="8" height="32" rx="4" fill={FOG} />
        <ellipse cx="58" cy="118" rx="6" ry="4" fill={INK} opacity="0.6" />
      </g>

      {/* front arm, holding the document */}
      <g style={{ transformOrigin: '63px 50px' }} className="motion-safe:animate-run-leg-back">
        <rect x="59.5" y="48" width="7" height="24" rx="3.5" fill={FOG} />
        <circle cx="63" cy="74" r="4" fill={FOG} />
        <g style={{ transformOrigin: '65px 72px' }} className="motion-safe:animate-paper-flap">
          <rect x="63" y="64" width="12" height="16" rx="1.5" fill={PAPER} stroke={INK} strokeWidth="0.6" />
          <line x1="65.5" y1="69" x2="72.5" y2="69" stroke={INK} strokeWidth="1" opacity="0.45" />
          <line x1="65.5" y1="73" x2="72.5" y2="73" stroke={INK} strokeWidth="1" opacity="0.45" />
        </g>
      </g>

      {/* head */}
      <path d="M37,15 L44,28 L29,25 Z" fill={FOG} />
      <path d="M39,19 L43,26 L34,24 Z" fill={MIST} />
      <path d="M63,15 L56,28 L71,25 Z" fill={FOG} />
      <path d="M61,19 L57,26 L66,24 Z" fill={MIST} />
      <circle cx="50" cy="27" r="15" fill={FOG} />
      <ellipse cx="50" cy="32" rx="8" ry="5" fill={PAPER} opacity="0.9" />
      <circle cx="44" cy="26" r="1.6" fill={INK} />
      <circle cx="56" cy="26" r="1.6" fill={INK} />
      <path d="M48,32 L52,32 L50,34 Z" fill={INK} />
      <g stroke={FOG} strokeWidth="1" opacity="0.8">
        <line x1="34" y1="30" x2="22" y2="28" />
        <line x1="34" y1="33" x2="22" y2="34" />
        <line x1="66" y1="30" x2="78" y2="28" />
        <line x1="66" y1="33" x2="78" y2="34" />
      </g>
    </svg>
  )
}
