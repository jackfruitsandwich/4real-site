import './banner.css'

/* StoryNotificationBanner from the app's onboarding: the verdict landing on your feed */
export function Banner() {
  return (
    <div className="banner">
      <img className="banner-icon" src="/story/icon-4real.png" alt="" />
      <div className="banner-body">
        <div className="banner-top">
          <span className="banner-title">Verdict: Refuted</span>
          <span className="banner-time">now</span>
        </div>
        <div className="banner-text">Floor sleeping won't 'realign' your spine — tap to see why</div>
      </div>
    </div>
  )
}
