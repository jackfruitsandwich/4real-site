/*
  A post from the app's onboarding demo set, ported from StoryDemoPosts.swift.
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
  video: '/story/wifi-tracking.mp4',
  poster: '/story/wifi-tracking.jpg',
  handle: 'moyer.the.lawyer',
  caption:
    'Wi-Fi can map your movement within your household…and radar can detect a heartbeat through walls. #wifitrackin',
  likes: '75.6K',
  comments: '1.4K',
  sheetTitle: 'Wi-Fi can track you through walls',
  reportTitle: 'Wi-Fi can track you through walls',
  claims: [
    {
      statement:
        'Wi-Fi signals can be used to map human body positions and movement through walls inside a home.',
      verdict: 'Verified',
      explanation:
        'Carnegie Mellon and MIT researchers have demonstrated systems that map Wi-Fi signal reflections into human body poses and movement, even through walls. These approaches use deep neural networks to interpret phase and amplitude data from specialized transceiver arrays.',
      sources: [src('arxiv.org'), src('publications.ri.cmu.edu'), src('rfpose.csail.mit.edu')],
    },
    {
      statement:
        'Even with all personal devices powered down, your in-home location and movements can be easily tracked by anyone with the technology, meaning physical privacy is effectively lost.',
      verdict: 'Misleading',
      explanation:
        'The video presents research capabilities as a current, everyday loss of privacy. In reality, these Wi-Fi sensing systems require deliberately deployed, multi-antenna hardware and calibrated environments, not standard home routers. The experiments were run in offices and classrooms with limited training data.',
      sources: [src('infoq.com'), src('marktechpost.com')],
    },
    {
      statement:
        'Radar and radio signals can detect microscopic body movement, including breathing, chest movement, and heartbeat, through walls from a distance.',
      verdict: 'Verified',
      explanation:
        'Peer-reviewed studies demonstrate through-wall detection of breathing and heart rate using ultra-wideband and continuous-wave radar. These systems measure minute chest movements via signal phase variations. They have been validated at short ranges and are primarily proposed for search-and-rescue and medical monitoring.',
      sources: [src('frontiersin.org'), src('pmc.ncbi.nlm.nih.gov'), src('nature.com')],
    },
    {
      statement:
        'Simply existing inside a home already creates a trackable digital footprint, and companies will inevitably exploit in-home movement patterns for targeted advertising.',
      verdict: 'Misleading',
      explanation:
        'The video implies that because researchers can map poses with Wi-Fi, companies will soon harvest movement data for ads. No evidence shows that fitness or food companies are collecting such information; the cited research is academic and explicitly framed for elder care and low-cost sensing.',
      sources: [src('publications.ri.cmu.edu'), src('syncedreview.com')],
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
