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
  video: '/story/3am-wakeup.mp4',
  poster: '/story/3am-wakeup.jpg',
  handle: 'dr.cayleychirumbolo',
  caption:
    'Let me paint you a picture of a day that might sound very familiar. You wake up in the morning already exhaus',
  likes: '22.6K',
  comments: '2.2K',
  sheetTitle: 'Why you wake up at 3am',
  reportTitle: 'Why you wake up at 3am',
  claims: [
    {
      statement:
        'Waking up between 2:00 and 4:00 a.m. is likely caused by a blood sugar crash, not by stress, anxiety, or being a light sleeper.',
      verdict: 'Misleading',
      explanation:
        'Nocturnal hypoglycemia can disrupt sleep, but major medical sources describe it primarily as a complication of diabetes treatment with insulin or sulfonylureas. For the general population, waking in the early morning hours is commonly caused by stress, anxiety, sleep apnea, or normal sleep-stage transitions.',
      sources: [src('cdc.gov'), src('hopkinsmedicine.org'), src('niddk.nih.gov')],
    },
    {
      statement:
        'When blood sugar drops during sleep, the body releases a surge of adrenaline and cortisol that wakes you up.',
      verdict: 'Refuted',
      explanation:
        'Primary physiologic studies directly contradict this mechanism. In controlled studies of people with type 1 diabetes, epinephrine responses to hypoglycemia were markedly blunted during deep sleep compared with wakefulness, and cortisol levels did not increase during nocturnal hypoglycemic episodes.',
      sources: [src('nejm.org'), src('onlinelibrary.wiley.com'), src('pmc.ncbi.nlm.nih.gov')],
    },
    {
      statement:
        'Morning fatigue and an afternoon energy crash share a single root cause with nighttime waking: blood sugar dysregulation.',
      verdict: 'Misleading',
      explanation:
        'Nocturnal hypoglycemia can leave you tired in the morning, and reactive blood-sugar swings after meals may contribute to afternoon fatigue. However, these three symptoms frequently have unrelated causes, such as poor sleep hygiene, obstructive sleep apnea, or normal circadian dips.',
      sources: [src('diatribe.org'), src('joslin.org'), src('mcpress.mayoclinic.org')],
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
