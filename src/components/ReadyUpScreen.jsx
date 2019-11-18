import React, { useContext } from 'react';
import { GameContext } from './GameContext';

export function ReadyUpScreen() {
  const { handleReadyUp } = useContext(GameContext);
  return <button onClick={() => handleReadyUp()}>Ready</button>;
}
