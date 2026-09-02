/* Web stand-ins for the SF Symbols the report screen uses. */

type IconProps = { size?: number; weight?: number; style?: React.CSSProperties; className?: string }

function Base({
  size = 24,
  weight = 2,
  style,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
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
