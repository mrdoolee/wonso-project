import type { ReactNode } from 'react'
import './SplitLayout.css'

interface SplitLayoutProps {
  /** Left pane on desktop/tablet-landscape: forms, navigation, controls */
  control: ReactNode
  /** Right pane on desktop/tablet-landscape: the interactive/live content */
  simulation: ReactNode
  /** Label shown as a tap-to-expand summary for the control pane on narrow screens */
  controlLabel?: string
  /** On narrow screens, which pane should appear first in reading/DOM order */
  mobileOrder?: 'control-first' | 'simulation-first'
  className?: string
}

export default function SplitLayout({
  control,
  simulation,
  controlLabel,
  mobileOrder = 'control-first',
  className,
}: SplitLayoutProps) {
  const rootClass = [
    'split-layout',
    mobileOrder === 'simulation-first' ? 'split-layout--sim-first' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass}>
      {controlLabel ? (
        <details className="split-layout__control split-layout__control--collapsible glass-panel" open>
          <summary className="split-layout__control-summary">
            <span>{controlLabel}</span>
            <span className="split-layout__chevron" aria-hidden="true">
              ▾
            </span>
          </summary>
          <div className="split-layout__control-body">{control}</div>
        </details>
      ) : (
        <div className="split-layout__control glass-panel">{control}</div>
      )}
      <div className="split-layout__simulation">{simulation}</div>
    </div>
  )
}
