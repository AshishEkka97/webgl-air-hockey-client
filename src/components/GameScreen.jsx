import React, { useContext } from 'react';
import { GameContext } from './GameContext';

export function GameScreen() {
  const { gameDetails } = useContext(GameContext);
  return (
    <ul>
      <li>
        <h3>{gameDetails.player1.name}</h3>
        <h2>{gameDetails.player1.score}</h2>
      </li>
      <li>
        <h3>{gameDetails.player2.name}</h3>
        <h2>{gameDetails.player2.score}</h2>
      </li>
    </ul>
  );
}
