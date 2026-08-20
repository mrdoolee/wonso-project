import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import type { GameState } from '../../types'
import { gameReducer, initialGameState, loadPersistedState, persistState, type GameAction } from './gameEngine'

interface GameContextValue {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

const GameContext = createContext<GameContextValue | null>(null)

function init(): GameState {
  return loadPersistedState() ?? initialGameState
}

/**
 * App 최상단에 한 번만 마운트한다. 게임플레이 탭을 벗어나도 언마운트되지 않으므로
 * 룰북/이론학습을 오가는 동안에도 진행 중인 라운드·점수가 그대로 유지된다.
 */
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, init)

  useEffect(() => {
    persistState(state)
  }, [state])

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame은 GameProvider 내부에서만 사용할 수 있습니다.')
  return ctx
}
