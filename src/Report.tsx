import { useState } from 'react'
import { StatusBar } from './Phone'
import { ArrowUpRight, Minimize } from './Icons'
import {
  BUCKET_TINT,
  bucketOf,
  faviconURL,
  sourceDisplayName,
  verdictTint,
  type Bucket,
  type Claim,
  type DemoPost,
  type Source,
} from './demo'
import './report.css'

/* Port of VideoInfoView + ClaimCardView. Same fonts, paddings, radii and tints. */

export function VerdictPill({ verdict, className = '' }: { verdict: string; className?: string }) {
  const tint = verdictTint(verdict)
  return (
    <span
      className={`vpill ${className}`}
      style={{ background: tint, boxShadow: `0 calc(2 * var(--pt)) calc(7 * var(--pt)) ${tint}8c` }}
    >
      {verdict}
    </span>
  )
}

/* SourceIconView: Google's favicon service, letter fallback */
export function FaviconChip({ source, size }: { source: Source; size: number }) {
  const [failed, setFailed] = useState(false)
  const s = { width: `calc(${size} * var(--pt))`, height: `calc(${size} * var(--pt))` }
  if (failed) {
    return (
      <span className="favicon favicon-fallback" style={{ ...s, fontSize: `calc(${size * 0.5} * var(--pt))` }}>
        {source.domain[0].toUpperCase()}
      </span>
    )
  }
  return (
    <span className="favicon" style={s}>
      <img src={faviconURL(source.domain)} alt="" onError={() => setFailed(true)} />
    </span>
  )
}

function ClaimCard({ claim, expanded }: { claim: Claim; expanded: boolean }) {
  return (
    <div className={`claim ${expanded ? 'claim-open' : ''}`}>
      <div className="claim-top">
        <VerdictPill verdict={claim.verdict} />
        <span className="claim-chips">
          {claim.sources.slice(0, 4).map(s => (
            <span className="claim-chip" key={s.domain}>
              <FaviconChip source={s} size={26} />
            </span>
          ))}
        </span>
      </div>
      <p className="claim-statement">{claim.statement}</p>
      {/* spring(response 0.3, damping 0.7) in the app; grid rows animate the height here */}
      <div className={`claim-more ${expanded ? 'claim-more-open' : ''}`} aria-hidden={!expanded}>
        <div className="claim-more-inner">
          <div className="claim-rule" />
          <div className="claim-why">WHY THIS VERDICT</div>
          <p className="claim-explanation">{claim.explanation}</p>
          <div className="claim-sources">
            {claim.sources.map(s => (
              <div className="claim-source" key={s.domain}>
                <FaviconChip source={s} size={30} />
                <span className="claim-source-text">
                  <span className="claim-source-name">{sourceDisplayName(s)}</span>
                  <span className="claim-source-domain">{s.domain}</span>
                </span>
                <ArrowUpRight size={12} weight={2.4} className="claim-source-arrow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ReportScreen({
  post,
  expanded = null,
  showBack = true,
}: {
  post: DemoPost
  expanded?: number | null
  showBack?: boolean
}) {
  const counts = post.claims.reduce<Record<Bucket, number>>(
    (acc, c) => {
      acc[bucketOf(c.verdict)] += 1
      return acc
    },
    { verified: 0, nuance: 0, misleading: 0, other: 0 },
  )
  const order: Bucket[] = ['verified', 'nuance', 'misleading', 'other']

  return (
    <div className="report">
      <div className="ambient" aria-hidden="true">
        <div className="ambient-mesh" />
      </div>
      <StatusBar />
      <div className="report-scroll">
        {showBack && (
          <div className="report-back">
            <Minimize size={18} weight={2.4} />
          </div>
        )}
        <div className="report-header">
          <h3 className="report-title">{post.reportTitle}</h3>
          <div className="report-dots">
            {order
              .filter(b => counts[b] > 0)
              .map(b => (
                <span className="report-dot" key={b}>
                  <span className="glow" style={{ background: BUCKET_TINT[b], color: BUCKET_TINT[b] }} />
                  {counts[b]}
                </span>
              ))}
          </div>
        </div>
        <div className="report-cards">
          {post.claims.map((c, i) => (
            <ClaimCard claim={c} expanded={expanded === i} key={i} />
          ))}
        </div>
        <p className="report-note">AI may make mistakes — tap a card to see the reasoning and sources.</p>
      </div>
    </div>
  )
}
