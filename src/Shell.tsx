import type { ReactNode } from 'react'
import './shell.css'

export const INSTAGRAM_URL = 'https://instagram.com/4aboreal'
export const TIKTOK_URL = 'https://tiktok.com/@4real'

export function Wordmark({ size = 22 }: { size?: number }) {
  return (
    <span className="wordmark" style={{ fontSize: size }}>
      4Real<span className="wordmark-q">?</span>
    </span>
  )
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <header className="shell-nav">
        <a className="shell-nav-brand" href="#/" aria-label="4Real home">
          <Wordmark />
        </a>
        <nav className="shell-nav-links" aria-label="Social">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer">
            TikTok
          </a>
        </nav>
      </header>

      <main className="shell-content">{children}</main>

      <footer className="shell-footer">
        <span className="shell-copyright">&copy; 2026 4Real</span>
        <div className="shell-footer-links">
          <a href="#/privacy">Privacy</a>
          <a href="#/terms">Terms</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer">
            TikTok
          </a>
        </div>
      </footer>
    </div>
  )
}
