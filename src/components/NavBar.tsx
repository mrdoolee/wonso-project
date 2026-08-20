import './NavBar.css'
import type { ViewKey } from '../App'

const TABS: { key: ViewKey; label: string; icon: string }[] = [
  { key: 'gameplay', label: '게임플레이', icon: '🎮' },
  { key: 'rulebook', label: '룰북', icon: '📖' },
  { key: 'theory', label: '이론학습', icon: '🧪' },
]

interface NavBarProps {
  active: ViewKey
  onChange: (view: ViewKey) => void
}

export default function NavBar({ active, onChange }: NavBarProps) {
  return (
    <header className="navbar glass-panel glass-panel--strong">
      <div className="navbar__brand">
        <span className="navbar__logo">WoNsO</span>
        <span className="navbar__logo-accent">원-소</span>
      </div>
      <nav className="navbar__tabs" aria-label="주요 메뉴">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`navbar__tab${active === tab.key ? ' navbar__tab--active' : ''}`}
            aria-current={active === tab.key ? 'page' : undefined}
            onClick={() => onChange(tab.key)}
          >
            <span className="navbar__tab-icon" aria-hidden="true">
              {tab.icon}
            </span>
            <span className="navbar__tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </header>
  )
}
