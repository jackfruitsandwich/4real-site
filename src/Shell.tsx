import { useEffect, useRef, type ReactNode } from 'react'
import './shell.css'

/* ── Gradient — exact port from my-video/src/stills/gradient.ts ── */

type RGB = [number, number, number]

const APP_GRADIENT_COLORS: RGB[] = [
  [13, 99, 163], [13, 99, 163], [216, 71, 94],
  [13, 99, 163], [226, 133, 119], [229, 60, 20],
  [216, 71, 94], [241, 189, 167], [13, 99, 163],
]

/*
  The original gradient uses positions 0–100% which puts blob centers
  at the very edges. Those blobs fade to transparent, revealing the dark
  #173454 base. On mobile Safari this shows as dark bars at top/bottom.

  Fix: compress the 3×3 grid inward (e.g. 0→15, 50→50, 100→85) so
  edge blobs overlap past the viewport, and use larger blob sizes (120%)
  so coverage is complete. The visual character stays the same.
*/

const POSITIONS = [
  [-10, -10], [50, -10], [110, -10],
  [-10, 50],  [50, 50],  [110, 50],
  [-10, 110], [50, 110], [110, 110],
] as const

const lerp = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
]

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`

function buildGradient(phase: number): string {
  const layers = APP_GRADIENT_COLORS.map((base, i) => {
    const next = APP_GRADIENT_COLORS[(i + 1) % APP_GRADIENT_COLORS.length]
    const blend = i === 4
      ? Math.sin(2 * Math.PI * phase + i * 0.7) * 0.2 + 0.4
      : Math.sin(2 * Math.PI * phase + i * 0.7) * 0.6 + 0.5
    const c = lerp(base, next, blend)
    const [x, y] = POSITIONS[i]
    return `radial-gradient(120% 120% at ${x}% ${y}%, ${rgba(c, 1)} 0%, ${rgba(c, 0)} 70%)`
  })
  layers.push(`linear-gradient(180deg, ${rgba([23, 52, 84], 1)} 0%, ${rgba([23, 52, 84], 1)} 100%)`)
  return layers.join(', ')
}

function AnimatedGradient() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let id: number
    const tick = (t: number) => {
      if (ref.current) ref.current.style.background = buildGradient((t / 1000 / 12) % 1)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])
  return <div ref={ref} className="shell-gradient" style={{ background: buildGradient(0) }} />
}

/* ── Shell ─────────────────────────────────────── */

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <AnimatedGradient />
      <main className="shell-content">{children}</main>
      <footer className="t1-footer">
        <div className="t1-footer-links">
          <a href="#/privacy">Privacy Policy</a>
          <span className="t1-footer-dot" />
          <a href="#/terms">Terms &amp; Conditions</a>
        </div>
        <div className="t1-footer-social">
          <a href="https://instagram.com/4aboreal" target="_blank" rel="noreferrer">Instagram</a>
          <span className="t1-footer-dot" />
          <a href="https://tiktok.com/@4real" target="_blank" rel="noreferrer">TikTok</a>
        </div>
        <span className="t1-copyright">&copy; 2025 4Real</span>
      </footer>
    </div>
  )
}
