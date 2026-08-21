import { useEffect, useState } from 'react'
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

  // 이 훅은 게임 내내 마운트된 상태로 유지되므로(라운드가 바뀌어도 언마운트되지 않음),
  // 라운드가 넘어갈 때마다 직접 0으로 되돌려주지 않으면 이전 라운드에 입력했던
  // 카드 수가 다음 라운드 입력 화면에 그대로 남아있게 된다.
  useEffect(() => {
    const reset: Record<string, CardCounts> = {}
    for (const p of state.players) reset[p.id] = { elementCards: 0, actionCards: 0 }
    setDraft(reset)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentRound])

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
        각 플레이어의 손에 남은 카드 수를 입력하면 아래에서 라운드 점수가 자동으로 계산됩니다. 맨 아래
        플레이어까지 입력한 뒤 하단의 확정 버튼을 눌러주세요.
      </p>
      <button type="button" className="btn btn--ghost" onClick={handleCancel}>
        ← 취소
      </button>
    </div>
  )

  const mainNode = (
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
      <button type="button" className="btn btn--primary btn--block round-end-submit" onClick={handleSubmit}>
        ✅ 확정하고 다음으로
      </button>
    </div>
  )

  return { controlNode, mainNode }
}
