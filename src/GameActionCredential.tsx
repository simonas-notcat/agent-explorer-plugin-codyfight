import * as React from "react";
import { UniqueVerifiableCredential } from "@veramo/core";
import { OperatorSummary } from "./OperatorSummary";
import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { PixiApp } from "./PixiApp";

export const GameActionCredential: React.FC<{credential: UniqueVerifiableCredential}> = ({ credential: { verifiableCredential, hash } }) => {

  const game = verifiableCredential.credentialSubject.previousState
  const strategy = verifiableCredential.credentialSubject.strategy
  const xCount = game.map.length;
  const yCount = game.map[0].length;
  const tileSize = 24


  return (
    <Space direction="vertical" style={{marginTop: 10}}>
      <Typography.Text>Opponent: {game.players.opponent.name}</Typography.Text>
      <Typography.Text>Strategy: {strategy.name}</Typography.Text>
      <PixiApp 
        width={xCount * tileSize} 
        height={yCount * tileSize} 
        game={game}
        tileSize={tileSize}
        actions={strategy.actions}
        />
    </Space>
  )
}
