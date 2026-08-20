export interface Player {
  id: string
  name: string
}

export interface PlayerRoundResult {
  penalty: number
  elementCards: number
  actionCards: number
  roundScore: number
}

export interface RoundRecord {
  round: number
  perPlayer: Record<string, PlayerRoundResult>
}

export type GamePhase = 'setup' | 'playing' | 'roundEnd' | 'finished'

export interface GameState {
  phase: GamePhase
  players: Player[]
  totalRounds: number
  currentRound: number
  livePenalty: Record<string, number>
  history: RoundRecord[]
}

export const MIN_PLAYERS = 2
export const MAX_PLAYERS = 6
export const MIN_ROUNDS = 1
export const MAX_ROUNDS = 5

export const PLAYER_PASTELS = [
  '#FFB3BA', // 코랄
  '#FFDFBA', // 살구
  '#FFF6BA', // 레몬
  '#BAFFC9', // 민트그린
  '#BAE1FF', // 스카이블루
  '#D6BAFF', // 라벤더
] as const

/** 이름을 비워두면 채워지는 예시 이름 — 유명 화학자들 */
export const CHEMIST_NAMES = [
  '드미트리 멘델레예프',
  '앙투안 라부아지에',
  '스반테 아레니우스',
  '길버트 루이스',
  '라이너스 폴링',
  '마리 퀴리',
] as const
