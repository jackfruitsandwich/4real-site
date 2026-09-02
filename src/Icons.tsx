/* Web stand-ins for the SF Symbols the app's screens use. */

type IconProps = { size?: number; weight?: number; style?: React.CSSProperties; className?: string }

function Base({
  size = 24,
  weight = 2,
  style,
  className,
  children,
  fill = false,
}: IconProps & { children: React.ReactNode; fill?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'}
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Base>
)

export const Minimize = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 4h6v6M20 4l-6 6M10 20H4v-6M4 20l6-6" />
  </Base>
)

export const Paperplane = (p: IconProps) => (
  <Base {...p} fill>
    <path d="M21.4 2.6a1 1 0 0 0-1.05-.23L2.6 9.1a1 1 0 0 0 .04 1.88l7.3 2.6 2.6 7.3a1 1 0 0 0 1.88.04l6.75-17.75a1 1 0 0 0-.23-1.05zM11.1 12.9l-5.6-2 11.4-4.4z" />
  </Base>
)

export const Heart = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20.6s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 8.1a4.2 4.2 0 0 1 7.5 2.3c0 5.6-7.5 10.2-7.5 10.2z" />
  </Base>
)

export const Bubble = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 5.5h15a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H11l-4.5 3.7V16.5h-2A1.5 1.5 0 0 1 3 15V7a1.5 1.5 0 0 1 1.5-1.5z" />
  </Base>
)

export const Ellipsis = (p: IconProps) => (
  <Base {...p} fill>
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </Base>
)

export const Magnifier = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 21 21" />
  </Base>
)

export const SealCheck = (p: IconProps) => (
  <Base {...p} fill>
    <path d="M12 2.2l2.1 1.6 2.6-.4 1 2.4 2.4 1-.4 2.6 1.6 2.1-1.6 2.1.4 2.6-2.4 1-1 2.4-2.6-.4L12 21.8l-2.1-1.6-2.6.4-1-2.4-2.4-1 .4-2.6L2.7 12l1.6-2.1-.4-2.6 2.4-1 1-2.4 2.6.4zM10.6 15.3l5.4-5.4-1.4-1.4-4 4-1.9-1.9-1.4 1.4z" />
  </Base>
)

export const ChevronLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M15 5l-7 7 7 7" />
  </Base>
)

export const Camera = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.4-2h5.8l1.4 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" />
    <circle cx="12" cy="13" r="3.2" />
  </Base>
)

export const House = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 11.5 12 5l8 6.5V20H4z" />
    <path d="M10 20v-5h4v5" />
  </Base>
)

export const Reels = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
    <path d="M3.5 9h17M9 3.5 12 9M15 3.5 18 9" />
    <path d="M10.5 12.5v5l4-2.5z" fill="currentColor" stroke="none" />
  </Base>
)

export const Bag = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 8h14l-1 12H6z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </Base>
)

export const Person = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 18.5c1-2.5 3-3.5 5.5-3.5s4.5 1 5.5 3.5" />
  </Base>
)

export function StatusGlyphs({ light }: { light?: boolean }) {
  const c = light ? '#fff' : '#000'
  return (
    <span className="status-glyphs" aria-hidden="true">
      <svg viewBox="0 0 18 12" width="17" height="11">
        <rect x="0" y="8" width="3" height="4" rx="0.8" fill={c} />
        <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" fill={c} />
        <rect x="10" y="3" width="3" height="9" rx="0.8" fill={c} />
        <rect x="15" y="0" width="3" height="12" rx="0.8" fill={c} />
      </svg>
      <svg viewBox="0 0 16 12" width="15" height="11">
        <path d="M8 10.5 9.9 8.2A2.8 2.8 0 0 0 8 7.4a2.8 2.8 0 0 0-1.9.8zM4.2 6.1A5.6 5.6 0 0 1 8 4.6c1.5 0 2.8.6 3.8 1.5l1.4-1.6A7.7 7.7 0 0 0 8 2.5a7.7 7.7 0 0 0-5.2 2z" fill={c} />
        <path d="M1.5 3.1A9.8 9.8 0 0 1 8 .6c2.5 0 4.8.9 6.5 2.5L15.5 2A11.4 11.4 0 0 0 8 -1 11.4 11.4 0 0 0 .5 2z" fill={c} opacity="0.9" />
      </svg>
      <svg viewBox="0 0 27 13" width="26" height="12">
        <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={c} fill="none" opacity="0.4" />
        <rect x="2" y="2" width="19" height="9" rx="2" fill={c} />
        <path d="M24.5 4.5v4a2 2 0 0 0 0-4z" fill={c} opacity="0.4" />
      </svg>
    </span>
  )
}
