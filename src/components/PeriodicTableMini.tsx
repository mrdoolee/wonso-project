import { useMemo, useState } from 'react'
import { ELEMENTS, groupColor, groupLabel, periodShape, type ElementData } from '../data/elements'
import './PeriodicTableMini.css'

const MAIN_ROWS = ELEMENTS.filter((e) => !e.series)
const LANTHANIDES = ELEMENTS.filter((e) => e.series === 'lanthanide')
const ACTINIDES = ELEMENTS.filter((e) => e.series === 'actinide')

function Cell({
  el,
  active,
  dimmed,
  onSelect,
}: {
  el: ElementData
  active: boolean
  dimmed: boolean
  onSelect: (el: ElementData) => void
}) {
  return (
    <button
      type="button"
      className={`pt-cell${active ? ' pt-cell--active' : ''}${dimmed ? ' pt-cell--dim' : ''}`}
      style={{ background: groupColor(el) }}
      onClick={() => onSelect(el)}
      title={`${el.nameKo} (${el.symbol})`}
    >
      <span className="pt-cell__num">{el.number}</span>
      <span className="pt-cell__sym">{el.symbol}</span>
    </button>
  )
}

export default function PeriodicTableMini() {
  const [activeNumber, setActiveNumber] = useState<number | null>(8) // 기본값: 산소(O)

  const active = useMemo(() => ELEMENTS.find((e) => e.number === activeNumber) ?? null, [activeNumber])

  function isRelated(el: ElementData): boolean {
    if (!active) return false
    if (active.series) return el.series === active.series
    if (el.series) return false
    return el.group === active.group || el.period === active.period
  }

  return (
    <div className="pt">
      <div className="pt-scroll">
        <div className="pt-grid">
          {MAIN_ROWS.map((el) => (
            <div key={el.number} style={{ gridColumn: el.group, gridRow: el.period }}>
              <Cell
                el={el}
                active={active?.number === el.number}
                dimmed={active !== null && !isRelated(el)}
                onSelect={(e) => setActiveNumber(e.number)}
              />
            </div>
          ))}
          <div className="pt-placeholder" style={{ gridColumn: 3, gridRow: 6 }}>
            57–71
          </div>
          <div className="pt-placeholder" style={{ gridColumn: 3, gridRow: 7 }}>
            89–103
          </div>
        </div>
      </div>

      <div className="pt-footnote-label">🔻 란타넘족 (57~71) · 악티늄족 (89~103)</div>
      <div className="pt-scroll">
        <div className="pt-grid pt-grid--footnote">
          {LANTHANIDES.map((el, i) => (
            <div key={el.number} style={{ gridColumn: i + 1, gridRow: 1 }}>
              <Cell
                el={el}
                active={active?.number === el.number}
                dimmed={active !== null && !isRelated(el)}
                onSelect={(e) => setActiveNumber(e.number)}
              />
            </div>
          ))}
          {ACTINIDES.map((el, i) => (
            <div key={el.number} style={{ gridColumn: i + 1, gridRow: 2 }}>
              <Cell
                el={el}
                active={active?.number === el.number}
                dimmed={active !== null && !isRelated(el)}
                onSelect={(e) => setActiveNumber(e.number)}
              />
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div className="pt-info glass-panel glass-panel--soft">
          <div className="pt-info__swatch" style={{ background: groupColor(active) }} aria-hidden="true">
            {active.symbol}
          </div>
          <div className="pt-info__text">
            <div className="pt-info__name">
              {active.nameKo} <span className="pt-info__sym">({active.symbol})</span> · 원자번호 {active.number}
            </div>
            <div className="pt-info__meta">
              {groupLabel(active)} · {active.period}주기
            </div>
            <div className="pt-info__wonso">
              🎴 WoNsO 카드로는 <b>{periodShape(active.period).icon} {periodShape(active.period).label}</b> 도형 +
              위 색상 카드에 해당해요
            </div>
          </div>
        </div>
      )}

      <p className="pt-hint">원소를 눌러보면 같은 족(세로줄)·같은 주기(가로줄) 원소가 함께 강조돼요.</p>
    </div>
  )
}
