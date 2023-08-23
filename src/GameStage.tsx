import React from 'react'
import { GameState, GameStrategy } from './lib/codyfight-game-client/src'
import { useResize } from './utils/use-resize'
import { PixiApp } from './PixiApp'

export const GameStage: React.FC<{
  game: GameState,
  selectedStrategyIndex?: number
  strategies: GameStrategy[]
}> = ({ game, selectedStrategyIndex, strategies }) => {
  const size = useResize()
  const xCount = game.map.length;
  const yCount = game.map[0].length;
  const tileSize = Math.min((size.width - 30) / xCount, 64)

  const actions = selectedStrategyIndex !== undefined && strategies[selectedStrategyIndex] && strategies[selectedStrategyIndex].actions ? strategies[selectedStrategyIndex].actions : []

  return (
    <PixiApp 
      width={xCount * tileSize} 
      height={yCount * tileSize} 
      game={game}
      tileSize={tileSize}
      actions={actions}
    />
  )
}