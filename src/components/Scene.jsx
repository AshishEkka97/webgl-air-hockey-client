import React, { useContext } from 'react';
import { GameContext } from './GameContext';
import { gameStates } from '../gameStates';
import ThreeScene from './ThreeScene';

export function Scene() {
  const { assetPositions, gameState, playerNumber } = useContext(GameContext);
  return (
    <ThreeScene
      started={gameState === gameStates.STARTED}
      playerNumber={playerNumber}
      assetPositions={assetPositions}
    />
  );
}
