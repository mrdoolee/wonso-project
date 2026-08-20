import SplitLayout from '../../components/SplitLayout'
import PeriodicTableMini from '../../components/PeriodicTableMini'
import { GROUP_COLORS, GROUP_NAMES } from '../../data/elements'
import { THEORY_SECTIONS, type TheoryBlock } from './theoryContent'
import './TheoryView.css'

const LEGEND_GROUPS = [1, 2, 13, 14, 15, 16, 17, 18]
const LEGEND_CARD_NAMES: Record<number, string> = {
  1: '빨강',
  2: '주황',
  13: '노랑',
  14: '초록',
  15: '파랑',
  16: '보라',
  17: '분홍',
  18: '회색',
}

function Block({ block }: { block: TheoryBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="theory-block__p">{block.text}</p>
    case 'list':
      return (
        <ul className="theory-block__list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'highlight':
      return <div className="theory-block__highlight">💡 {block.text}</div>
    case 'periodic-table':
      return <PeriodicTableMini />
    case 'group-legend':
      return (
        <div className="theory-legend">
          {LEGEND_GROUPS.map((g) => (
            <div key={g} className="theory-legend__row">
              <span className="theory-legend__swatch" style={{ background: GROUP_COLORS[g] }} />
              <span className="theory-legend__card">{LEGEND_CARD_NAMES[g]} 카드</span>
              <span className="theory-legend__arrow">=</span>
              <span className="theory-legend__group">{GROUP_NAMES[g]}</span>
            </div>
          ))}
          <div className="theory-legend__row">
            <span className="theory-legend__swatch" style={{ background: GROUP_COLORS[3] }} />
            <span className="theory-legend__card">민트 카드</span>
            <span className="theory-legend__arrow">=</span>
            <span className="theory-legend__group">3~12족 · 전이 금속</span>
          </div>
        </div>
      )
    case 'timeline':
      return (
        <ol className="theory-timeline">
          {block.items.map((item) => (
            <li key={item.year} className="theory-timeline__item">
              <span className="theory-timeline__year">{item.year}</span>
              <div className="theory-timeline__body">
                <div className="theory-timeline__name">{item.name}</div>
                <p className="theory-timeline__desc">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      )
    default:
      return null
  }
}

export default function TheoryView() {
  return (
    <SplitLayout
      controlLabel="목차"
      control={
        <nav className="theory-toc" aria-label="이론학습 목차">
          <h2 className="theory-toc__title">🧪 이론학습</h2>
          <ul className="theory-toc__list">
            {THEORY_SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#theory-${section.id}`}>
                  {section.icon} {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      }
      simulation={
        <div className="theory-content glass-panel">
          {THEORY_SECTIONS.map((section) => (
            <section key={section.id} id={`theory-${section.id}`} className="theory-section">
              <h3 className="theory-section__title">
                <span aria-hidden="true">{section.icon}</span>
                {section.title}
              </h3>
              <div className="theory-section__body">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      }
    />
  )
}
