import { useState, type ReactNode } from 'react'
import RulebookModal from '../../components/RulebookModal'
import { useGame } from './GameContext'
import { useSetupPanel } from './SetupPanel'
import { useRoundEndForm } from './RoundEndForm'
import PlayerTouchGrid from './PlayerTouchGrid'
import ScoreBoard from './ScoreBoard'
import './GameplayView.css'

function RulebookButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="btn" onClick={onClick}>
      📖 룰북 보기
    </button>
  )
}

function ResetButton() {
  const { dispatch } = useGame()
  function handleClick() {
    if (window.confirm('진행 중인 게임을 초기화하고 처음 화면으로 돌아갈까요?')) {
      dispatch({ type: 'RESET_GAME' })
    }
  }
  return (
    <button type="button" className="btn btn--danger" onClick={handleClick}>
      ⏮ 처음으로
    </button>
  )
}

function PlayingControls({ onOpenRulebook }: { onOpenRulebook: () => void }) {
  const { state, dispatch } = useGame()
  return (
    <div className="playing-controls">
      <div className="playing-controls__round">
        <span className="playing-controls__round-label">진행 중</span>
        <span className="playing-controls__round-value">
          Round {state.currentRound} / {state.totalRounds}
        </span>
      </div>
      <p className="playing-controls__hint">
        플레이어가 원소 이름을 외치지 않으면 아래에서 해당 플레이어를 터치해 패널티를 기록하세요.
      </p>
      <div className="playing-controls__actions">
        <RulebookButton onClick={onOpenRulebook} />
        <button type="button" className="btn btn--primary" onClick={() => dispatch({ type: 'END_ROUND' })}>
          🏁 라운드 종료
        </button>
        <ResetButton />
      </div>
    </div>
  )
}

function FinishedControls({ onOpenRulebook }: { onOpenRulebook: () => void }) {
  const { dispatch } = useGame()
  return (
    <div className="playing-controls">
      <h2 className="playing-controls__done-title">🎉 게임 종료!</h2>
      <p className="playing-controls__hint">아래 스코어보드에서 최종 결과를 확인하세요.</p>
      <div className="playing-controls__actions">
        <RulebookButton onClick={onOpenRulebook} />
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => dispatch({ type: 'RESET_GAME' })}
        >
          🔄 새 게임 시작
        </button>
      </div>
    </div>
  )
}

export default function GameplayView() {
  const { state } = useGame()
  const [rulebookOpen, setRulebookOpen] = useState(false)

  const setup = useSetupPanel()
  const roundEnd = useRoundEndForm()

  let top: ReactNode
  let main: ReactNode

  if (state.phase === 'setup') {
    top = setup.controlNode
    main = setup.simulationNode
  } else if (state.phase === 'roundEnd') {
    top = (
      <>
        {roundEnd.controlNode}
        <ResetButton />
      </>
    )
    main = roundEnd.mainNode
  } else if (state.phase === 'finished') {
    top = <FinishedControls onOpenRulebook={() => setRulebookOpen(true)} />
    main = <ScoreBoard />
  } else {
    top = <PlayingControls onOpenRulebook={() => setRulebookOpen(true)} />
    main = (
      <>
        <PlayerTouchGrid />
        <ScoreBoard />
      </>
    )
  }

  return (
    <div className="gameplay-view">
      <div className="gp-top glass-panel">{top}</div>
      <div className="gp-main">{main}</div>
      <RulebookModal open={rulebookOpen} onClose={() => setRulebookOpen(false)} />
    </div>
  )
}
