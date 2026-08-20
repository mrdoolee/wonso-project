import { describe, expect, it } from 'vitest'
import {
  computeRoundScore,
  computeTotals,
  gameReducer,
  getWinnerIds,
  initialGameState,
} from './gameEngine'
import type { GameState, Player } from '../../types'

const players: Player[] = [
  { id: 'p1', name: '플레이어 1' },
  { id: 'p2', name: '플레이어 2' },
  { id: 'p3', name: '플레이어 3' },
]

function startGame(totalRounds: number): GameState {
  return gameReducer(initialGameState, { type: 'START_GAME', players, totalRounds })
}

describe('computeRoundScore', () => {
  it('원소카드 1점, 액션카드 2점, 패널티 그대로 합산한다', () => {
    expect(computeRoundScore(3, 2, 1)).toBe(3 * 1 + 2 * 2 + 1)
    expect(computeRoundScore(0, 0, 0)).toBe(0)
  })
})

describe('gameReducer', () => {
  it('START_GAME은 플레이어별 패널티를 0으로 초기화하고 playing 단계로 전환한다', () => {
    const state = startGame(3)
    expect(state.phase).toBe('playing')
    expect(state.currentRound).toBe(1)
    expect(state.livePenalty).toEqual({ p1: 0, p2: 0, p3: 0 })
  })

  it('TAP_PENALTY/UNDO_PENALTY는 해당 플레이어의 패널티만 증감시키고 0 밑으로 내려가지 않는다', () => {
    let state = startGame(1)
    state = gameReducer(state, { type: 'TAP_PENALTY', playerId: 'p1' })
    state = gameReducer(state, { type: 'TAP_PENALTY', playerId: 'p1' })
    state = gameReducer(state, { type: 'TAP_PENALTY', playerId: 'p2' })
    expect(state.livePenalty).toEqual({ p1: 2, p2: 1, p3: 0 })

    state = gameReducer(state, { type: 'UNDO_PENALTY', playerId: 'p3' })
    expect(state.livePenalty.p3).toBe(0) // already 0, stays 0

    state = gameReducer(state, { type: 'UNDO_PENALTY', playerId: 'p1' })
    expect(state.livePenalty.p1).toBe(1)
  })

  it('룰북 모달과 동일한 성격의 조회 전용 액션은 존재하지 않으므로, 정의되지 않은 액션은 상태를 바꾸지 않는다', () => {
    const state = startGame(1)
    // @ts-expect-error 의도적으로 잘못된 액션 타입을 넣어 안전망을 검증
    const next = gameReducer(state, { type: 'NOT_A_REAL_ACTION' })
    expect(next).toBe(state)
  })

  it('한 라운드짜리 게임은 SUBMIT_ROUND_SCORES 한 번으로 finished가 된다', () => {
    let state = startGame(1)
    state = gameReducer(state, { type: 'TAP_PENALTY', playerId: 'p2' }) // p2 패널티 1
    state = gameReducer(state, { type: 'END_ROUND' })
    expect(state.phase).toBe('roundEnd')

    state = gameReducer(state, {
      type: 'SUBMIT_ROUND_SCORES',
      perPlayerCardCounts: {
        p1: { elementCards: 2, actionCards: 0 }, // 2점
        p2: { elementCards: 1, actionCards: 1 }, // 1+2+패널티1 = 4점
        p3: { elementCards: 0, actionCards: 0 }, // 0점
      },
    })

    expect(state.phase).toBe('finished')
    expect(state.history).toHaveLength(1)
    const totals = computeTotals(state)
    expect(totals).toEqual({ p1: 2, p2: 4, p3: 0 })
    expect(getWinnerIds(state)).toEqual(['p3'])
  })

  it('여러 라운드에 걸쳐 점수가 누적되고, 마지막 라운드 전에는 playing으로 돌아간다', () => {
    let state = startGame(2)

    state = gameReducer(state, { type: 'END_ROUND' })
    state = gameReducer(state, {
      type: 'SUBMIT_ROUND_SCORES',
      perPlayerCardCounts: {
        p1: { elementCards: 1, actionCards: 0 },
        p2: { elementCards: 1, actionCards: 0 },
        p3: { elementCards: 1, actionCards: 0 },
      },
    })
    expect(state.phase).toBe('playing')
    expect(state.currentRound).toBe(2)
    expect(state.livePenalty).toEqual({ p1: 0, p2: 0, p3: 0 })

    state = gameReducer(state, { type: 'TAP_PENALTY', playerId: 'p1' })
    state = gameReducer(state, { type: 'END_ROUND' })
    state = gameReducer(state, {
      type: 'SUBMIT_ROUND_SCORES',
      perPlayerCardCounts: {
        p1: { elementCards: 0, actionCards: 0 }, // +1(패널티) = 1
        p2: { elementCards: 0, actionCards: 0 },
        p3: { elementCards: 3, actionCards: 0 }, // 3
      },
    })

    expect(state.phase).toBe('finished')
    const totals = computeTotals(state)
    expect(totals).toEqual({ p1: 2, p2: 1, p3: 4 })
    expect(getWinnerIds(state)).toEqual(['p2'])
  })

  it('동점이면 공동 승자를 모두 반환한다', () => {
    let state = startGame(1)
    state = gameReducer(state, { type: 'END_ROUND' })
    state = gameReducer(state, {
      type: 'SUBMIT_ROUND_SCORES',
      perPlayerCardCounts: {
        p1: { elementCards: 2, actionCards: 0 },
        p2: { elementCards: 2, actionCards: 0 },
        p3: { elementCards: 5, actionCards: 0 },
      },
    })
    expect(getWinnerIds(state).sort()).toEqual(['p1', 'p2'])
  })

  it('RESET_GAME은 항상 초기 상태로 되돌린다', () => {
    let state = startGame(3)
    state = gameReducer(state, { type: 'TAP_PENALTY', playerId: 'p1' })
    state = gameReducer(state, { type: 'RESET_GAME' })
    expect(state).toEqual(initialGameState)
  })
})
