import { useEffect, useState } from 'react'
import { Shell } from './Shell'
import { Home } from './Home'
import { MarkdownPage } from './MarkdownPage'

function getRoute(): string {
  return window.location.hash.replace('#', '') || '/'
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  let page: React.ReactNode
  switch (route) {
    case '/privacy':
      page = <MarkdownPage src="/privacy-policy.md" />
      break
    case '/terms':
      page = <MarkdownPage src="/terms-conditions.md" />
      break
    default:
      page = <Home />
  }

  return <Shell>{page}</Shell>
}
