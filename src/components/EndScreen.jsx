import React, { useContext } from 'react';
import { GameContext } from './GameContext';

export function EndScreen() {
  const { controlledPlayer, gameDetails } = useContext(GameContext);
  return (
    <div>
      <h1>Winner - {gameDetails.winner}</h1>
      <p>
        {gameDetails.winner === gameDetails[controlledPlayer].name
          ? 'Congratulations!'
          : 'Better Luck Next Time!'}
      </p>
    </div>
  );
}
