import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import CreditsModal from './components/CreditsModal'
import { GameProvider } from './views/GameplayView/GameContext'
import GameplayView from './views/GameplayView/GameplayView'
import RulebookView from './views/RulebookView/RulebookView'
import TheoryView from './views/TheoryView/TheoryView'
import './App.css'

export type ViewKey = 'gameplay' | 'rulebook' | 'theory'

function parseHash(): ViewKey {
  const h = window.location.hash.replace('#', '')
  if (h === 'rulebook' || h === 'theory' || h === 'gameplay') return h
  return 'gameplay'
}

export default function App() {
  const [view, setView] = useState<ViewKey>(parseHash)
  const [creditsOpen, setCreditsOpen] = useState(false)

  useEffect(() => {
    function onHashChange() {
      setView(parseHash())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function changeView(next: ViewKey) {
    setView(next)
    window.location.hash = next
  }

  return (
    <GameProvider>
      <div className="app-backdrop" aria-hidden="true" />
      <div className="app-shell">
        <NavBar active={view} onChange={changeView} />
        <main className="app-main">
          {view === 'gameplay' && <GameplayView />}
          {view === 'rulebook' && <RulebookView />}
          {view === 'theory' && <TheoryView />}
        </main>
        <footer className="app-footer">
          © 2026 Designed &amp; Developed by{' '}
          <button type="button" className="app-footer__credit" onClick={() => setCreditsOpen(true)}>
            두리쌤
          </button>
          . All rights reserved.
        </footer>
      </div>
      <CreditsModal open={creditsOpen} onClose={() => setCreditsOpen(false)} />
    </GameProvider>
  )
}
