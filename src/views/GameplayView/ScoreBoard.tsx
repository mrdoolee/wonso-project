import { PLAYER_PASTELS } from '../../types'
import { computeTotals, getWinnerIds } from './gameEngine'
import { useGame } from './GameContext'
import './ScoreBoard.css'

export default function ScoreBoard() {
  const { state } = useGame()
  const totals = computeTotals(state)
  const winnerIds = new Set(getWinnerIds(state))
  const isFinal = state.phase === 'finished'

  const ranked = [...state.players].sort((a, b) => totals[a.id] - totals[b.id])

  return (
    <div className="scoreboard glass-panel">
      <div className="scoreboard__header">
        <h3 className="scoreboard__title">{isFinal ? '🏆 최종 결과' : '📊 누적 스코어보드'}</h3>
        {!isFinal && state.history.length === 0 && (
          <span className="scoreboard__hint">라운드를 마치면 점수가 채워집니다</span>
        )}
      </div>

      <div className="scoreboard__table-wrap">
        <table className="scoreboard__table">
          <thead>
            <tr>
              <th>순위</th>
              <th>플레이어</th>
              {Array.from({ length: state.totalRounds }, (_, i) => (
                <th key={i}>R{i + 1}</th>
              ))}
              <th>총점</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((player, rank) => {
              const playerIndex = state.players.findIndex((p) => p.id === player.id)
              const color = PLAYER_PASTELS[playerIndex % PLAYER_PASTELS.length]
              const isWinner = isFinal && winnerIds.has(player.id)
              return (
                <tr key={player.id} className={isWinner ? 'scoreboard__row--winner' : ''}>
                  <td className="scoreboard__rank">{rank === 0 ? '👑' : rank + 1}</td>
                  <td>
                    <span className="scoreboard__swatch" style={{ background: color }} aria-hidden="true" />
                    {player.name}
                  </td>
                  {Array.from({ length: state.totalRounds }, (_, i) => {
                    const record = state.history.find((h) => h.round === i + 1)
                    const score = record?.perPlayer[player.id]?.roundScore
                    return <td key={i}>{score ?? '—'}</td>
                  })}
                  <td className="scoreboard__total">{totals[player.id]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {isFinal && (
        <p className="scoreboard__winner-banner">
          🎉 {ranked.filter((p) => winnerIds.has(p.id)).map((p) => p.name).join(', ')}
          {winnerIds.size > 1 ? '님 공동 우승!' : '님 우승!'} (최저 점수 {totals[ranked[0].id]}점)
        </p>
      )}
    </div>
  )
}
