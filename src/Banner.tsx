import './banner.css'

/* StoryNotificationBanner from the app's onboarding: the verdict landing on your feed */
export function Banner({ breathe = false }: { breathe?: boolean }) {
  return (
    <div className={`banner ${breathe ? 'banner-breathe' : ''}`}>
      <img className="banner-icon" src="/story/icon-4real.png" alt="" />
      <div className="banner-body">
        <div className="banner-top">
          <span className="banner-title">Verdict: Verified</span>
          <span className="banner-time">now</span>
        </div>
        <div className="banner-text">Wi-Fi really can see through walls — tap to see why</div>
      </div>
    </div>
  )
}
