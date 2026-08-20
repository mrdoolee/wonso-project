import { useState, type ReactNode } from 'react'
import SplitLayout from '../../components/SplitLayout'
import RulebookModal from '../../components/RulebookModal'
import { useGame } from './GameContext'
import { useSetupPanel } from './SetupPanel'
import { useRoundEndForm } from './RoundEndForm'
import PlayerTouchGrid from './PlayerTouchGrid'
import ScoreBoard from './ScoreBoard'
import './GameplayView.css'

function RulebookButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="btn btn--block" onClick={onClick}>
      📖 룰북 보기
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
        플레이어가 원소 이름을 외치지 않으면 오른쪽에서 해당 플레이어를 터치해 패널티를 기록하세요.
      </p>
      <RulebookButton onClick={onOpenRulebook} />
      <button
        type="button"
        className="btn btn--primary btn--block"
        onClick={() => dispatch({ type: 'END_ROUND' })}
      >
        🏁 라운드 종료
      </button>
    </div>
  )
}

function FinishedControls({ onOpenRulebook }: { onOpenRulebook: () => void }) {
  const { dispatch } = useGame()
  return (
    <div className="playing-controls">
      <h2 className="playing-controls__done-title">🎉 게임 종료!</h2>
      <p className="playing-controls__hint">오른쪽 스코어보드에서 최종 결과를 확인하세요.</p>
      <RulebookButton onClick={onOpenRulebook} />
      <button type="button" className="btn btn--primary btn--block" onClick={() => dispatch({ type: 'RESET_GAME' })}>
        🔄 새 게임 시작
      </button>
    </div>
  )
}

export default function GameplayView() {
  const { state } = useGame()
  const [rulebookOpen, setRulebookOpen] = useState(false)

  const setup = useSetupPanel()
  const roundEnd = useRoundEndForm()

  let layout: ReactNode

  if (state.phase === 'setup') {
    layout = (
      <SplitLayout controlLabel="⚙️ 설정" control={setup.controlNode} simulation={setup.simulationNode} />
    )
  } else if (state.phase === 'roundEnd') {
    layout = (
      <SplitLayout
        controlLabel="📝 라운드 결과 입력"
        control={roundEnd.controlNode}
        simulation={roundEnd.simulationNode}
      />
    )
  } else if (state.phase === 'finished') {
    layout = (
      <SplitLayout
        controlLabel="🎉 게임 종료"
        control={<FinishedControls onOpenRulebook={() => setRulebookOpen(true)} />}
        simulation={<ScoreBoard />}
      />
    )
  } else {
    layout = (
      <SplitLayout
        controlLabel="🕹️ 라운드 진행"
        mobileOrder="simulation-first"
        control={<PlayingControls onOpenRulebook={() => setRulebookOpen(true)} />}
        simulation={
          <>
            <PlayerTouchGrid />
            <ScoreBoard />
          </>
        }
      />
    )
  }

  return (
    <div className="gameplay-view">
      {layout}
      <RulebookModal open={rulebookOpen} onClose={() => setRulebookOpen(false)} />
    </div>
  )
}
