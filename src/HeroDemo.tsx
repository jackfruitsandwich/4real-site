import { useEffect, useState } from 'react'
import { PhoneFrame, StatusBar } from './Phone'
import { ReportScreen } from './Report'
import { Banner } from './Banner'
import { HERO_POST } from './demo'
import {
  Bag,
  Bubble,
  Camera,
  ChevronLeft,
  Ellipsis,
  Heart,
  House,
  Magnifier,
  Paperplane,
  Person,
  Reels,
  SealCheck,
} from './Icons'
import './herodemo.css'

/*
  The hero phone plays the app's payoff on a loop: you're in the feed, the
  verdict banner lands, tapping it opens the report, a card expands to show
  the reasoning and sources. Feed chrome is a port of StoryReelPage.
*/

type Stage = 'feed' | 'banner' | 'tap' | 'report' | 'expanded' | 'out'

/* Beat timing follows the onboarding: the verdict lands 1.9s into the beat,
   the tap dips the banner, the report springs in over the dimmed feed. */
const STAGE_MS: Record<Stage, number> = {
  feed: 2400,
  banner: 3000,
  tap: 220,
  report: 1500,
  expanded: 5200,
  out: 500,
}

const NEXT: Record<Stage, Stage> = {
  feed: 'banner',
  banner: 'tap',
  tap: 'report',
  report: 'expanded',
  expanded: 'out',
  out: 'feed',
}

const post = HERO_POST

function FeedScene({ dim }: { dim: boolean }) {
  return (
    <div className="feed">
      <video
        className="feed-video"
        src={post.video}
        poster={post.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="feed-scrim-top" />
      <div className="feed-scrim-bottom" />
      <StatusBar light />
      <div className="feed-head">
        <ChevronLeft size={22} weight={2.4} />
        <span>Shorts</span>
        <Camera size={22} weight={1.9} />
      </div>

      <div className="feed-meta">
        <div className="feed-author">
          <span className="feed-avatar" />
          <span>{post.handle}</span>
          <SealCheck size={15} />
          <span className="feed-follow">Follow</span>
        </div>
        <p className="feed-caption">{post.caption}</p>
      </div>

      <div className="feed-rail">
        <span className="rail-item">
          <Heart size={25} weight={2.2} />
          <span>{post.likes}</span>
        </span>
        <span className="rail-item">
          <Bubble size={25} weight={2.2} />
          <span>{post.comments}</span>
        </span>
        <span className="rail-item">
          <Paperplane size={25} />
        </span>
        <span className="rail-item">
          <Ellipsis size={25} />
        </span>
      </div>

      <div className="feed-tabs">
        <House size={24} weight={1.9} />
        <Magnifier size={24} weight={2.1} />
        <Reels size={24} weight={1.9} />
        <Bag size={24} weight={1.9} />
        <Person size={24} weight={1.9} />
      </div>

      <div className={`feed-dim ${dim ? 'feed-dim-on' : ''}`} />
    </div>
  )
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function HeroDemo({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const [stage, setStage] = useState<Stage>(reduced ? 'expanded' : 'feed')

  useEffect(() => {
    if (reduced) return
    const id = setTimeout(() => setStage(s => NEXT[s]), STAGE_MS[stage])
    return () => clearTimeout(id)
  }, [stage, reduced])

  const showBanner = stage === 'banner' || stage === 'tap'
  const showReport = stage === 'report' || stage === 'expanded' || stage === 'out'
  /* The room dims when the verdict lands and stays dim under the report, like the app */
  const dim = showBanner || showReport

  return (
    <PhoneFrame className={className}>
      <FeedScene dim={dim} />
      {showBanner && (
        <div className="banner-drop">
          <div className={`banner-press ${stage === 'tap' ? 'banner-tapped' : ''}`}>
            <Banner breathe />
          </div>
        </div>
      )}
      {showReport && (
        <div className={`report-push ${stage === 'out' ? 'report-out' : ''}`}>
          <ReportScreen post={post} expanded={stage === 'expanded' || stage === 'out' ? 0 : null} />
        </div>
      )}
    </PhoneFrame>
  )
}
