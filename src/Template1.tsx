import { useEffect, useRef } from 'react'
import './template1.css'

/* ── Gradient builder — ported from my-video/src/stills/gradient.ts ── */

type RGB = [number, number, number]

const APP_GRADIENT_COLORS: RGB[] = [
  [13, 99, 163],
  [13, 99, 163],
  [216, 71, 94],
  [13, 99, 163],
  [226, 133, 119],
  [229, 60, 20],
  [216, 71, 94],
  [241, 189, 167],
  [13, 99, 163],
]

const interpolateRgb = (from: RGB, to: RGB, t: number): RGB => [
  Math.round(from[0] + (to[0] - from[0]) * t),
  Math.round(from[1] + (to[1] - from[1]) * t),
  Math.round(from[2] + (to[2] - from[2]) * t),
]

const toRgba = (rgb: RGB, a: number) =>
  `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`

const POSITIONS = [
  [0, 0], [50, 0], [100, 0],
  [0, 50], [50, 50], [100, 50],
  [0, 100], [50, 100], [100, 100],
] as const

function buildGradientBackground(phase: number, opacity = 1): string {
  const layers = APP_GRADIENT_COLORS.map((base, i) => {
    const next = APP_GRADIENT_COLORS[(i + 1) % APP_GRADIENT_COLORS.length]
    const blend =
      i === 4
        ? Math.sin(2 * Math.PI * phase + i * 0.7) * 0.2 + 0.4
        : Math.sin(2 * Math.PI * phase + i * 0.7) * 0.6 + 0.5
    const c = interpolateRgb(base, next, blend)
    const [x, y] = POSITIONS[i]
    return `radial-gradient(90% 90% at ${x}% ${y}%, ${toRgba(c, opacity)} 0%, rgba(${c[0]}, ${c[1]}, ${c[2]}, 0) 62%)`
  })

  layers.push(
    `linear-gradient(180deg, ${toRgba([23, 52, 84], opacity)} 0%, ${toRgba([23, 52, 84], opacity)} 100%)`
  )

  return layers.join(', ')
}

/* ── Animated gradient background component ───── */

function AnimatedGradient() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame: number
    const CYCLE_SECONDS = 12

    const tick = (now: number) => {
      const phase = ((now / 1000) / CYCLE_SECONDS) % 1
      if (ref.current) {
        ref.current.style.background = buildGradientBackground(phase)
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      ref={ref}
      className="t1-gradient"
      style={{ background: buildGradientBackground(0) }}
    />
  )
}

/* ── Page ──────────────────────────────────────── */

export function Template1() {
  return (
    <div className="t1">
      <AnimatedGradient />

      {/* ── Hero ─────────────────────────────────── */}
      <section className="t1-hero">
        <div className="t1-glass t1-hero-card">
          <span className="t1-logo">4Real</span>
          <h1 className="t1-headline">
            The trust layer
            <br />
            for the internet.
          </h1>
          <p className="t1-subline">
            AI-powered factchecking for video. Share any clip — get sourced
            verdicts on every claim, in seconds.
          </p>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────── */}
      <section className="t1-mission-section">
        <div className="t1-glass t1-mission-card">
          <span className="t1-mission-label">Our Mission</span>
          <p className="t1-mission-text">
            Misinformation isn't a literacy problem — it's an infrastructure
            problem. We're building the tools to solve it. 4Real is the first:
            AI factchecking that works at the speed of the feed. Next comes
            deepfake detection, content verification, and a new standard of
            trust for digital media.
          </p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="t1-footer">
        <div className="t1-footer-links">
          <a href="/privacy">Privacy Policy</a>
          <span className="t1-footer-dot" />
          <a href="/terms">Terms &amp; Conditions</a>
          <span className="t1-footer-dot" />
          <a href="/eula">EULA</a>
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
