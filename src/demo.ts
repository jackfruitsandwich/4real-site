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
  video: '/story/lost-hikers.mp4',
  poster: '/story/lost-hikers.jpg',
  handle: 'jasonkpargin',
  caption: 'Why humans tend to move counterclockwise',
  likes: '238.7K',
  comments: '3.4K',
  sheetTitle: 'Why lost hikers walk in circles',
  reportTitle: 'Why lost hikers walk in circles',
  claims: [
    {
      statement:
        'Humans have a natural tendency to turn or drift in a counterclockwise direction when walking.',
      verdict: 'Verified',
      explanation:
        'A study published in Nature Communications tracked pedestrians in Spain and Japan and found a robust preference for counterclockwise turning in 32 of 33 experimental trials. The effect persisted even when people walked alone in open spaces and across different cultures and age groups.',
      sources: [src('nature.com'), src('phys.org'), src('u-tokyo.ac.jp')],
    },
    {
      statement:
        'Most grocery stores are designed with the entrance on the right to guide shoppers on a counterclockwise loop.',
      verdict: 'Needs Nuance',
      explanation:
        'Retail-design sources confirm that in right-hand-traffic markets like the U.S., supermarkets commonly place entrances on the right to nudge shoppers counterclockwise. However, this is not universal; left-hand-traffic countries such as the U.K. often use opposite layouts.',
      sources: [src('floridatrend.com'), src('inverse.com'), src('shopappy.com')],
    },
    {
      statement:
        'Races and race cars move counterclockwise because of this inherent human walking tendency.',
      verdict: 'Misleading',
      explanation:
        'The study authors note a parallel but explicitly state that investigating sports is a task for future research. Traditional explanations for track direction involve stronger right legs or historical convention, not the new locomotor findings.',
      sources: [src('nature.com'), src('smithsonianmag.com')],
    },
    {
      statement:
        'Lost hikers tend to walk in counterclockwise circles and are often found less than a mile from the trail even after many hours.',
      verdict: 'Refuted',
      explanation:
        'A 2009 Current Biology study confirms that disoriented people walk in circles when they lack visual cues, but it explicitly ruled out a systematic counterclockwise bias. Participants circled unpredictably, sometimes left, sometimes right.',
      sources: [src('mpg.de'), src('nationalgeographic.com'), src('sciencedirect.com')],
    },
    {
      statement:
        'The counterclockwise walking bias appears across different cultures and is also seen in cattle.',
      verdict: 'Verified',
      explanation:
        'The Nature Communications experiments produced the same leftward drift in both Spanish and Japanese walkers, indicating the bias is not culturally learned. Agricultural sources also cite studies showing that a majority of cattle prefer moving anticlockwise around handlers.',
      sources: [src('en.unav.edu'), src('fwi.co.uk')],
    },
    {
      statement:
        'The bias is not caused by right-handedness; left-handed people show the same counterclockwise tendency.',
      verdict: 'Verified',
      explanation:
        'The researchers directly tested whether handedness, footedness, or eye dominance caused the leftward drift and found no supporting evidence. Counterclockwise motion still emerged in experiments where all participants were left-handed.',
      sources: [src('nature.com'), src('smithsonianmag.com')],
    },
    {
      statement:
        'Scientists do not yet know the exact reason humans have a counterclockwise walking bias.',
      verdict: 'Verified',
      explanation:
        'The study authors state that while they have ruled out several obvious factors, the precise origin remains unknown. They suspect a biomechanical asymmetry but emphasize that more research is needed to identify it.',
      sources: [src('nature.com'), src('phys.org')],
    },
    {
      statement:
        'If you are searching for a landmark while walking and cannot find it, there is a good chance it is off to your right.',
      verdict: 'Hypothesis',
      explanation:
        'While the study documents a slight leftward veer during free walking, it never tested whether this reliably causes people to miss specific landmarks. The tip is a logical but unverified extrapolation from laboratory data.',
      sources: [src('nature.com')],
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
