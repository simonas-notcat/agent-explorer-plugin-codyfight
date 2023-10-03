import React, { useRef, useEffect } from 'react';
import { Application, Sprite} from 'pixi.js';
import { GameMap } from './GameMap';
import { GameAction, GameState } from './lib/codyfight-game-client/src';
import { skills } from './assets/skills';
import { codyfighter } from './assets/codyfighter';

type Props = {
  width: number;
  height: number;
  game: GameState,
  tileSize: number,
  actions: GameAction[]
}
let idx = 0;

export const PixiApp: React.FC<Props> = ({width, height, game, tileSize, actions}) => {
  const pixiContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pixiContainer.current || pixiContainer === null) return;

    const app = new Application({
      width: width,
      height: height,
    });

    //@ts-ignore
    pixiContainer.current.appendChild(app.view);
    const gameMap = GameMap({ game, tileSize })
    app.stage.addChild(gameMap)
    let actionSprites: Sprite[] = []
    if (actions !== undefined) {

      actions.forEach((action, i) => {
        const sprite = Sprite.from(
          action.type === 'move'
          ? codyfighter[game.players.bearer.codyfighter.type]
          // FIXME: this is a hack
          //@ts-ignore
          : skills[1])
        // const sprite = PIXI.Sprite.from(
        //   codyfighter[game.players.bearer.codyfighter.type])
          sprite.anchor.set(0.5)
          sprite.x = action.position.x * tileSize + tileSize / 2
          sprite.y = action.position.y * tileSize + tileSize / 2
          sprite.width = tileSize
          sprite.height = tileSize
          sprite.alpha = i === 0 ? 1 : 0.5
          actionSprites.push(sprite)
          app.stage.addChild(sprite)
        })
      }


    app.ticker.add((delta: number) => {
      idx += 0.05 * delta;
      actionSprites.forEach((sprite, i) => {
        const w = Math.min(Math.abs(Math.sin(idx)) + 0.3, 1) * tileSize
        sprite.width = w
        sprite.height = w
      })
    });

    return () => {
      app.destroy(true, true);
    };
  }, [width, height, game, tileSize, actions]);

  return <div ref={pixiContainer}></div>;
};


