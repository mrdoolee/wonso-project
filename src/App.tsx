import NavBar from './components/NavBar'
import { GameProvider } from './views/GameplayView/GameContext'
import GameplayView from './views/GameplayView/GameplayView'
import './App.css'

export default function App() {
  return (
    <GameProvider>
      <div className="app-backdrop" aria-hidden="true" />
      <div className="app-shell">
        <NavBar />
        <main className="app-main">
          <GameplayView />
        </main>
      </div>
    </GameProvider>
  )
}
