import type { GamePhase, GameState, Player, PlayerRoundResult, RoundRecord } from '../../types'

export const STORAGE_KEY = 'wonso.gameState.v1'

export const initialGameState: GameState = {
  phase: 'setup',
  players: [],
  totalRounds: 3,
  currentRound: 1,
  livePenalty: {},
  history: [],
}

export type GameAction =
  | { type: 'START_GAME'; players: Player[]; totalRounds: number }
  | { type: 'TAP_PENALTY'; playerId: string }
  | { type: 'UNDO_PENALTY'; playerId: string }
  | { type: 'END_ROUND' }
  | { type: 'CANCEL_ROUND_END' }
  | { type: 'SUBMIT_ROUND_SCORES'; perPlayerCardCounts: Record<string, { elementCards: number; actionCards: number }> }
  | { type: 'RESET_GAME' }
  | { type: 'RESTORE'; state: GameState }

/** 라운드 점수 = 남은 원소카드 1장당 1점 + 남은 액션카드 1장당 2점 + 받은 패널티 점수 */
export function computeRoundScore(elementCards: number, actionCards: number, penalty: number): number {
  return elementCards * 1 + actionCards * 2 + penalty
}

/** 각 플레이어의 확정된 라운드 기록을 모두 합산한 누적 점수 */
export function computeTotals(state: GameState): Record<string, number> {
  const totals: Record<string, number> = {}
  for (const player of state.players) {
    totals[player.id] = 0
  }
  for (const round of state.history) {
    for (const player of state.players) {
      totals[player.id] += round.perPlayer[player.id]?.roundScore ?? 0
    }
  }
  return totals
}

/** 누적 점수가 가장 낮은 플레이어(들). 동점이면 공동 승자로 여러 명 반환 */
export function getWinnerIds(state: GameState): string[] {
  if (state.players.length === 0) return []
  const totals = computeTotals(state)
  const min = Math.min(...state.players.map((p) => totals[p.id]))
  return state.players.filter((p) => totals[p.id] === min).map((p) => p.id)
}

function nextPhaseAfterSubmit(state: GameState): GamePhase {
  return state.currentRound >= state.totalRounds ? 'finished' : 'playing'
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const livePenalty: Record<string, number> = {}
      for (const p of action.players) livePenalty[p.id] = 0
      return {
        phase: 'playing',
        players: action.players,
        totalRounds: action.totalRounds,
        currentRound: 1,
        livePenalty,
        history: [],
      }
    }

    case 'TAP_PENALTY': {
      if (state.phase !== 'playing') return state
      return {
        ...state,
        livePenalty: {
          ...state.livePenalty,
          [action.playerId]: (state.livePenalty[action.playerId] ?? 0) + 1,
        },
      }
    }

    case 'UNDO_PENALTY': {
      if (state.phase !== 'playing') return state
      const current = state.livePenalty[action.playerId] ?? 0
      if (current <= 0) return state
      return {
        ...state,
        livePenalty: { ...state.livePenalty, [action.playerId]: current - 1 },
      }
    }

    case 'END_ROUND': {
      if (state.phase !== 'playing') return state
      return { ...state, phase: 'roundEnd' }
    }

    case 'CANCEL_ROUND_END': {
      if (state.phase !== 'roundEnd') return state
      return { ...state, phase: 'playing' }
    }

    case 'SUBMIT_ROUND_SCORES': {
      if (state.phase !== 'roundEnd') return state
      const perPlayer: Record<string, PlayerRoundResult> = {}
      for (const player of state.players) {
        const counts = action.perPlayerCardCounts[player.id] ?? { elementCards: 0, actionCards: 0 }
        const penalty = state.livePenalty[player.id] ?? 0
        perPlayer[player.id] = {
          penalty,
          elementCards: counts.elementCards,
          actionCards: counts.actionCards,
          roundScore: computeRoundScore(counts.elementCards, counts.actionCards, penalty),
        }
      }
      const record: RoundRecord = { round: state.currentRound, perPlayer }
      const history = [...state.history, record]
      const resetPenalty: Record<string, number> = {}
      for (const p of state.players) resetPenalty[p.id] = 0

      const nextState: GameState = {
        ...state,
        history,
        livePenalty: resetPenalty,
        currentRound: state.currentRound + 1,
      }
      return { ...nextState, phase: nextPhaseAfterSubmit(state) }
    }

    case 'RESET_GAME':
      return initialGameState

    case 'RESTORE':
      return action.state

    default:
      return state
  }
}

export function loadPersistedState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as GameState
    if (!parsed || typeof parsed !== 'object' || !parsed.phase) return null
    return parsed
  } catch {
    return null
  }
}

export function persistState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage 사용 불가 환경(사생활 보호 모드 등)에서는 조용히 무시
  }
}
