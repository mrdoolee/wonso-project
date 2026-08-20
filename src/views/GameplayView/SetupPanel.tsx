import { useState } from 'react'
import Stepper from '../../components/Stepper'
import { MAX_PLAYERS, MAX_ROUNDS, MIN_PLAYERS, MIN_ROUNDS, PLAYER_PASTELS } from '../../types'
import { useGame } from './GameContext'
import './SetupPanel.css'

interface SetupDraft {
  playerCount: number
  names: string[]
  totalRounds: number
}

export function useSetupPanel() {
  const { dispatch } = useGame()
  const [draft, setDraft] = useState<SetupDraft>({
    playerCount: 4,
    names: Array.from({ length: MAX_PLAYERS }, () => ''),
    totalRounds: 3,
  })

  function setName(index: number, value: string) {
    setDraft((prev) => {
      const names = [...prev.names]
      names[index] = value
      return { ...prev, names }
    })
  }

  function handleStart() {
    const players = Array.from({ length: draft.playerCount }, (_, i) => ({
      id: `p${i + 1}`,
      name: draft.names[i]?.trim() || `플레이어 ${i + 1}`,
    }))
    dispatch({ type: 'START_GAME', players, totalRounds: draft.totalRounds })
  }

  const controlNode = (
    <div className="setup-panel">
      <h2 className="setup-panel__title">게임 설정</h2>

      <Stepper
        label="참가 인원"
        value={draft.playerCount}
        min={MIN_PLAYERS}
        max={MAX_PLAYERS}
        unit="명"
        onChange={(next) => setDraft((prev) => ({ ...prev, playerCount: next }))}
      />

      <Stepper
        label="라운드 수"
        value={draft.totalRounds}
        min={MIN_ROUNDS}
        max={MAX_ROUNDS}
        unit="라운드"
        onChange={(next) => setDraft((prev) => ({ ...prev, totalRounds: next }))}
      />

      <div className="setup-panel__names">
        <span className="setup-panel__names-label">플레이어 이름 (선택)</span>
        {Array.from({ length: draft.playerCount }, (_, i) => (
          <input
            key={i}
            type="text"
            className="setup-panel__name-input"
            placeholder={`플레이어 ${i + 1}`}
            value={draft.names[i] ?? ''}
            maxLength={12}
            onChange={(e) => setName(i, e.target.value)}
            style={{ borderColor: PLAYER_PASTELS[i] }}
          />
        ))}
      </div>

      <button type="button" className="btn btn--primary btn--block" onClick={handleStart}>
        🚀 게임 시작
      </button>
    </div>
  )

  const simulationNode = (
    <div className="setup-preview glass-panel glass-panel--soft">
      <h3 className="setup-preview__title">미리보기</h3>
      <div className="setup-preview__chips">
        {Array.from({ length: draft.playerCount }, (_, i) => (
          <div key={i} className="setup-preview__chip" style={{ background: PLAYER_PASTELS[i] }}>
            {draft.names[i]?.trim() || `플레이어 ${i + 1}`}
          </div>
        ))}
      </div>
      <p className="setup-preview__summary">
        총 <strong>{draft.playerCount}명</strong>이 <strong>{draft.totalRounds}라운드</strong> 동안 대결합니다.
      </p>
    </div>
  )

  return { controlNode, simulationNode }
}
