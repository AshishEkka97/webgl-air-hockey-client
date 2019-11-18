import React, { useContext } from 'react';
import { GameContext } from './GameContext';

export function StartingScreen() {
  const { countdown } = useContext(GameContext);
  return <h1>{countdown === 0 ? 'Start!' : countdown}</h1>;
}
