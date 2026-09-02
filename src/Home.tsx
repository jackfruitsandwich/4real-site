import { VerdictPill } from './Report'
import { HeroDemo } from './HeroDemo'
import './home.css'

/* App Store badge. Not live yet, so it's a labelled placeholder rather than a link. */
function AppStoreBadge() {
  return (
    <div className="badge" role="img" aria-label="Coming soon on the App Store">
      <svg className="badge-apple" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
        />
      </svg>
      <span className="badge-text">
        <span className="badge-small">Coming soon on the</span>
        <span className="badge-big">App Store</span>
      </span>
    </div>
  )
}

/* Platform marks, set inline in the sentence */
const MARKS: Record<string, string> = {
  Instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  TikTok: 'M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-1.99 6.13-1.59.02 1.48-.04 2.96-.04 4.44-.98-.32-2.13-.23-2.99.37-.63.41-1.1 1.03-1.35 1.73-.2.51-.15 1.07-.13 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  Shorts: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
}

function Mark({ name }: { name: keyof typeof MARKS }) {
  return (
    <span className="mark" role="img" aria-label={name}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d={MARKS[name]} />
      </svg>
    </span>
  )
}

/* Claims for the ticker, in the app's six-verdict system. */
const TICKER: Array<[string, string]> = [
  ['Your body can only absorb 30g of protein per meal', 'Refuted'],
  ['Honey never spoils', 'Verified'],
  ['Cold plunges permanently raise testosterone', 'No evidence'],
  ['Octopuses have three hearts', 'Verified'],
  ['Mouth taping fixes sleep apnea', 'Misleading'],
  ['Seed oils are toxic', 'Needs nuance'],
  ['The Great Wall is visible from space', 'Refuted'],
  ['Blue light before bed ruins your sleep', 'Needs nuance'],
  ['Cracking your knuckles causes arthritis', 'No evidence'],
  ['Bananas are radioactive', 'Verified'],
  ['We swallow eight spiders a year in our sleep', 'Refuted'],
  ['Intermittent fasting boosts autophagy in humans', 'Hypothesis'],
]

function Ticker() {
  return (
    <section className="ticker" aria-label="Recent factchecks">
      <div className="ticker-track">
        {[0, 1].map(copy => (
          <div className="ticker-row" key={copy} aria-hidden={copy === 1}>
            {TICKER.map(([claim, verdict]) => (
              <span className="ticker-item" key={claim}>
                <span className="ticker-claim">{claim}</span>
                <VerdictPill verdict={verdict} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export function Home() {
  return (
    <div className="home">
      <div className="home-aura" aria-hidden="true" />

      <section className="hero">
        <div className="hero-copy">
          <h1 className="hero-h">
            Your feed is
            <br />
            lying to you.
          </h1>
          <p className="hero-sub">
            Share any <Mark name="TikTok" />, <Mark name="Instagram" />, or <Mark name="Shorts" /> to
            4Real and keep scrolling. A sourced verdict lands in your notifications about a minute
            later.
          </p>
          <div className="hero-actions">
            <AppStoreBadge />
          </div>
        </div>

        <div className="hero-demo">
          <HeroDemo className="hero-phone" />
        </div>
      </section>

      <Ticker />

      <section className="closing">
        <p className="closing-h">Don't get fooled by your feed.</p>
        <AppStoreBadge />
      </section>
    </div>
  )
}
