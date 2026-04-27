import './designs.css'

const HEADLINE = 'Catch missinformation before it reaches your moms feed'
const SUBLINE = 'The first factchecker that keeps up with the speed of the feed. Share any post and keep scrolling your factcheck will arive in a few seconds'
const MISSION_LABEL = 'Mission'
const MISSION = "Misinformation isn't a literacy problem — it's an infrastructure problem. We're making factchecking easy, fast, and entertaining, because truth deserves better distribution than the slop. Next step: AI detection"

/* Offset Editorial — content on the left; gradient on the right */

export function D8() {
  return (
    <div className="d d8">
      <div className="d8-column">
        <section className="d8-hero">
          <span className="logo">4Real</span>
          <h1 className="d8-h">{HEADLINE}</h1>
          <p className="d8-sub">{SUBLINE}</p>
        </section>
        <div className="d8-rule" />
        <section className="d8-mission">
          <span className="mission-label">{MISSION_LABEL}</span>
          <p className="d8-body">{MISSION}</p>
        </section>
      </div>
    </div>
  )
}
