import { useState } from 'react'
import Stepper from '../../components/Stepper'
import { PLAYER_PASTELS } from '../../types'
import { computeRoundScore } from './gameEngine'
import { useGame } from './GameContext'
import './RoundEndForm.css'

interface CardCounts {
  elementCards: number
  actionCards: number
}

const MAX_CARDS = 20

export function useRoundEndForm() {
  const { state, dispatch } = useGame()
  const [draft, setDraft] = useState<Record<string, CardCounts>>(() => {
    const initial: Record<string, CardCounts> = {}
    for (const p of state.players) initial[p.id] = { elementCards: 0, actionCards: 0 }
    return initial
  })

  function updateCount(playerId: string, key: keyof CardCounts, value: number) {
    setDraft((prev) => ({
      ...prev,
      [playerId]: { ...(prev[playerId] ?? { elementCards: 0, actionCards: 0 }), [key]: value },
    }))
  }

  function handleSubmit() {
    dispatch({ type: 'SUBMIT_ROUND_SCORES', perPlayerCardCounts: draft })
  }

  function handleCancel() {
    dispatch({ type: 'CANCEL_ROUND_END' })
  }

  const controlNode = (
    <div className="round-end-controls">
      <h2 className="round-end-controls__title">라운드 {state.currentRound} 결과 입력</h2>
      <p className="round-end-controls__hint">
        각 플레이어의 손에 남은 카드 수를 입력하면 오른쪽에서 라운드 점수가 자동으로 계산됩니다.
      </p>
      <div className="round-end-controls__actions">
        <button type="button" className="btn btn--ghost" onClick={handleCancel}>
          ← 취소
        </button>
        <button type="button" className="btn btn--primary btn--block" onClick={handleSubmit}>
          ✅ 확정하고 다음으로
        </button>
      </div>
    </div>
  )

  const simulationNode = (
    <div className="round-end-rows">
      {state.players.map((player, i) => {
        const counts = draft[player.id] ?? { elementCards: 0, actionCards: 0 }
        const penalty = state.livePenalty[player.id] ?? 0
        const preview = computeRoundScore(counts.elementCards, counts.actionCards, penalty)
        const color = PLAYER_PASTELS[i % PLAYER_PASTELS.length]

        return (
          <div key={player.id} className="round-end-row glass-panel" style={{ borderColor: color }}>
            <div className="round-end-row__head">
              <span className="round-end-row__swatch" style={{ background: color }} aria-hidden="true" />
              <span className="round-end-row__name">{player.name}</span>
              <span className="round-end-row__penalty">패널티 {penalty}점</span>
            </div>
            <div className="round-end-row__inputs">
              <Stepper
                size="sm"
                label="남은 원소카드"
                value={counts.elementCards}
                min={0}
                max={MAX_CARDS}
                unit="장"
                onChange={(v) => updateCount(player.id, 'elementCards', v)}
              />
              <Stepper
                size="sm"
                label="남은 액션카드"
                value={counts.actionCards}
                min={0}
                max={MAX_CARDS}
                unit="장"
                onChange={(v) => updateCount(player.id, 'actionCards', v)}
              />
            </div>
            <div className="round-end-row__preview">
              라운드 점수 <strong>{preview}점</strong>
              <span className="round-end-row__formula">
                ({counts.elementCards}×1 + {counts.actionCards}×2 + {penalty})
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )

  return { controlNode, simulationNode }
}
