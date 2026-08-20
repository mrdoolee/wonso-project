import SplitLayout from '../../components/SplitLayout'
import RulebookContent from '../../components/RulebookContent'
import './RulebookView.css'

const TOC = [
  { href: '#rb-compose', label: '① 카드 구성' },
  { href: '#rb-prep', label: '② 게임 준비 / ③ 카드 못 낼 때' },
  { href: '#rb-play', label: '④ 카드 내는 법' },
  { href: '#rb-action', label: '⑤ 특수 액션 카드' },
  { href: '#rb-win', label: '원소! 외치기 / 승리 조건' },
]

export default function RulebookView() {
  return (
    <SplitLayout
      controlLabel="목차"
      control={
        <nav className="rulebook-toc" aria-label="룰북 목차">
          <h2 className="rulebook-toc__title">📚 목차</h2>
          <ul className="rulebook-toc__list">
            {TOC.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      }
      simulation={
        <div className="rulebook-view__content glass-panel">
          <RulebookContent />
        </div>
      }
    />
  )
}
