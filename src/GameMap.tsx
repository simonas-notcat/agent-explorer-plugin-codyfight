import { Container, Sprite } from 'pixi.js'
import { GameState, MapCellState } from './lib/codyfight-game-client/src';
import { tiles } from './assets/tiles'
import { codyfighter } from './assets/codyfighter'
import { specialAgent } from './assets/special-agent'

export const GameMap = ({ game, tileSize }: {
  game: GameState,
  tileSize: number
}): Container => {
  const container = new Container()
  container.position.set(0, 0)
  container.pivot.set(0, 0)
  container.alpha = 0.5

  game.map.forEach((row, x) => row.forEach((cell, y) => {
    const tile = MapTile({ cell, tileSize })
    container.addChild(tile)
  }))

  if (game.players.bearer.position !== null) {
    const sprite = Sprite.from(codyfighter[game.players.bearer.codyfighter.type])
    sprite.anchor.set(0)
    sprite.x = game.players.bearer.position.x * tileSize
    sprite.y = game.players.bearer.position.y * tileSize
    sprite.width = tileSize
    sprite.height = tileSize
    container.addChild(sprite)
  }

  if (game.players.opponent.position !== null) {
    const sprite = Sprite.from(codyfighter[game.players.opponent.codyfighter.type])
    sprite.anchor.set(0)
    sprite.x = game.players.opponent.position.x * tileSize
    sprite.y = game.players.opponent.position.y * tileSize
    sprite.width = tileSize
    sprite.height = tileSize
    container.addChild(sprite)
  }

  game.special_agents.forEach((agent, i) => {
    const sprite = Sprite.from(specialAgent[agent.type])
    sprite.anchor.set(0)
    sprite.x = agent.position.x * tileSize
    sprite.y = agent.position.y * tileSize
    sprite.width = tileSize
    sprite.height = tileSize
    container.addChild(sprite)
  })

  return container
}


export const MapTile = ({ cell, tileSize }: {
  cell: MapCellState
  tileSize: number
}) => {
  const sprite = Sprite.from(assetUrl(cell))
  sprite.anchor.set(0)
  sprite.x = cell.position.x * tileSize
  sprite.y = cell.position.y * tileSize
  sprite.width = tileSize
  sprite.height = tileSize

  return sprite
}

function assetUrl (cell: MapCellState) {

  switch (cell.type) {
    case 0:
      return tiles[0]
    case 1:
      return tiles[1]
    case 2:
      return tiles[2]
    case 3:
      return tiles[3]
    case 4:
      return tiles[4]
    case 6:
      return tiles[6]
    case 7:
      return tiles[7]
    case 8:
      return tiles[8]
    case 9:
      return tiles[9]
    case 10:
      return tiles[10]
    case 11:
      return tiles[11]
    case 12:
      return tiles[12]
    case 17:
      return tiles[17]
    default:
      console.log('Unknown cell type', cell.type, cell)
      return tiles.unknown
  }
}