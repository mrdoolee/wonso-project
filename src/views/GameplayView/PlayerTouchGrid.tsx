import { PLAYER_PASTELS } from '../../types'
import { useGame } from './GameContext'
import './PlayerTouchGrid.css'

/**
 * 라운드 진행 중 "원소 이름을 외치지 않은" 플레이어를 즉석에서 지적할 때
 * 그 플레이어의 카드를 터치해 패널티를 1회 누적시키는 그리드.
 */
export default function PlayerTouchGrid() {
  const { state, dispatch } = useGame()

  return (
    <div className="touch-grid glass-panel" role="group" aria-label="플레이어 패널티 터치 버튼">
      <div className="touch-grid__header">
        <h3 className="touch-grid__title">💬 원소 이름을 외치지 않았다면 터치!</h3>
        <p className="touch-grid__hint">터치할 때마다 패널티 +1점이 그 플레이어에게 쌓입니다.</p>
      </div>
      <div className="touch-grid__cells">
        {state.players.map((player, i) => {
          const penalty = state.livePenalty[player.id] ?? 0
          const color = PLAYER_PASTELS[i % PLAYER_PASTELS.length]
          return (
            <div key={player.id} className="touch-cell-wrap">
              <button
                type="button"
                className="touch-cell"
                style={{ background: color }}
                onClick={() => dispatch({ type: 'TAP_PENALTY', playerId: player.id })}
              >
                <span className="touch-cell__name">{player.name}</span>
                <span className="touch-cell__penalty">
                  <span className="touch-cell__penalty-num">{penalty}</span>
                  <span className="touch-cell__penalty-label">패널티</span>
                </span>
              </button>
              {penalty > 0 && (
                <button
                  type="button"
                  className="touch-cell__undo"
                  aria-label={`${player.name} 패널티 취소`}
                  onClick={() => dispatch({ type: 'UNDO_PENALTY', playerId: player.id })}
                >
                  ↺ 취소
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
