import './template4.css'

export function Template4() {
  return (
    <div className="t4">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="t4-hero">
        <span className="t4-logo">4Real</span>
        <h1 className="t4-headline">
          <span className="t4-gradient-text">The trust layer</span>
          <br />
          <span className="t4-gradient-text">for the internet.</span>
        </h1>
        <p className="t4-subline">
          AI-powered factchecking for video. Share any clip — get sourced
          verdicts on every claim, in seconds.
        </p>
      </section>

      {/* ── Gradient rule ────────────────────────── */}
      <div className="t4-rule" />

      {/* ── Mission ──────────────────────────────── */}
      <section className="t4-mission">
        <span className="t4-mission-label">Our Mission</span>
        <p className="t4-mission-text">
          Misinformation isn't a literacy problem — it's an infrastructure
          problem. We're building the tools to solve it. 4Real is the first:
          AI factchecking that works at the speed of the feed. Next comes
          deepfake detection, content verification, and a new standard of
          trust for digital media.
        </p>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="t4-footer">
        <div className="t4-footer-rule" />
        <div className="t4-footer-inner">
          <div className="t4-footer-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="t4-footer-dot" />
            <a href="/terms">Terms &amp; Conditions</a>
            <span className="t4-footer-dot" />
            <a href="/eula">EULA</a>
          </div>
          <div className="t4-footer-social">
            <a href="https://instagram.com/4aboreal" target="_blank" rel="noreferrer">Instagram</a>
            <span className="t4-footer-dot" />
            <a href="https://tiktok.com/@4real" target="_blank" rel="noreferrer">TikTok</a>
          </div>
          <span className="t4-copyright">&copy; 2025 4Real</span>
        </div>
      </footer>
    </div>
  )
}
