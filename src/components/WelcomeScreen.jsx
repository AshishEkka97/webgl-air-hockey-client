import React, { useContext } from 'react';
import { GameContext } from './GameContext';

export function WelcomeScreen() {
  const { handleCreateGame } = useContext(GameContext);
  return <button onClick={() => handleCreateGame()}>Create Game</button>;
}
