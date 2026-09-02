/*
  The onboarding story's hero post, ported from StoryDemoPosts.swift.
  Claims, verdicts and sources are the real production report for this video.
*/

export type Source = { url: string; domain: string }

export type Claim = {
  statement: string
  verdict: string
  explanation: string
  sources: Source[]
}

export type DemoPost = {
  video: string
  poster: string
  handle: string
  caption: string
  likes: string
  comments: string
  sheetTitle: string
  reportTitle: string
  claims: Claim[]
}

const src = (domain: string): Source => ({ url: `https://${domain}`, domain })

export const HERO_POST: DemoPost = {
  video: '/story/floor-sleeping.mp4',
  poster: '/story/floor-sleeping.jpg',
  handle: 'explainingourbody',
  caption:
    'Sleeping on the ground for 30 days straight sounds like a simple change, but it can create a surprisingly diff',
  likes: '60.9K',
  comments: '973',
  sheetTitle: '30 days sleeping on the floor',
  reportTitle: '30 days sleeping on the floor',
  claims: [
    {
      statement:
        "Sleeping on the floor for 30 days leads to a 'complete structural reboot' with a 'perfectly aligned' spine.",
      verdict: 'Refuted',
      explanation:
        'The video frames floor sleeping as a bio-hack that permanently restructures your skeleton, but the human spine has natural curves that require support. Research shows hard surfaces can flatten the lumbar curve and increase contact pressure, which may cause pain. Multiple reviews and a computational modeling study found that medium-firm mattresses, not bare floors, best preserve natural spinal alignment.',
      sources: [src('pmc.ncbi.nlm.nih.gov'), src('scientificamerican.com'), src('sleepfoundation.org')],
    },
    {
      statement: "After three weeks of floor sleeping, chronic lower back pain is 'completely gone.'",
      verdict: 'Misleading',
      explanation:
        'The video guarantees that chronic lower back pain will vanish within three weeks, but clinical evidence shows results are highly individual. A landmark 2003 Lancet trial found medium-firm mattresses reduced back pain more than firm ones, and experts warn that hard floors can worsen stiffness or nerve irritation.',
      sources: [src('healthline.com'), src('mattressmiracle.ca'), src('scientificamerican.com')],
    },
    {
      statement:
        "Floor sleeping makes your brain 'shut down much faster at night' and produces a sleep 'so deep, a soft mattress would never allow.'",
      verdict: 'Misleading',
      explanation:
        'The video claims floor sleeping triggers uniquely deep, fast-onset sleep, yet research indicates pressure points on hard surfaces can increase tossing and turning that fragments deep sleep and REM. Experts note that any sleep improvement may come from cooler temperatures near the floor.',
      sources: [src('indianexpress.com'), src('scientificamerican.com'), src('sleepfoundation.org')],
    },
  ],
}

/* verdictTint from RedesignTheme.swift */
export function verdictTint(verdict: string): string {
  const v = verdict.toLowerCase()
  if (v.includes('misleading') || v.includes('refuted')) return '#e53c14'
  if (v.includes('no evidence')) return '#c94258'
  if (v.includes('nuance')) return '#eab6a0'
  if (v.includes('hypothesis') || v.includes('opinion')) return '#e28577'
  if (v.includes('verified') || v.includes('true') || v.includes('accurate')) return '#0d63a3'
  return '#8a8f98'
}

/* VerdictBucket from RedesignTheme.swift, for the report header dots */
export type Bucket = 'verified' | 'nuance' | 'misleading' | 'other'

export function bucketOf(verdict: string): Bucket {
  const v = verdict.toLowerCase()
  if (v.includes('misleading') || v.includes('refuted')) return 'misleading'
  if (v.includes('nuance') || v.includes('hypothesis') || v.includes('opinion')) return 'nuance'
  if (v.includes('verified') || v.includes('true') || v.includes('accurate')) return 'verified'
  return 'other'
}

export const BUCKET_TINT: Record<Bucket, string> = {
  verified: '#0d63a3',
  nuance: '#eab6a0',
  misleading: '#e53c14',
  other: '#c94258',
}

/* sourceDisplayName in ClaimCardView: capitalized domain root */
export function sourceDisplayName(s: Source): string {
  const root = s.domain.replace(/^www\./, '').split('.')[0]
  return root.charAt(0).toUpperCase() + root.slice(1)
}

/* Same favicon service the app uses (SourceIconView) */
export function faviconURL(domain: string, size = 64): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`
}
