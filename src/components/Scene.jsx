import React, { useContext } from 'react';
import { GameContext } from './GameContext';
import { gameStates } from '../gameStates';
import ThreeScene from './ThreeScene';

export function Scene() {
  const { assetPositions, gameState, controlledPlayer } = useContext(GameContext);
  return (
    <ThreeScene
      started={gameState === gameStates.STARTED}
      controlledPlayer={controlledPlayer}
      assetPositions={assetPositions}
    />
  );
}
