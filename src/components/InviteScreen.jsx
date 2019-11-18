import React, { useContext } from 'react';
import { GameContext } from './GameContext';

export function InviteScreen() {
  const { gameURL } = useContext(GameContext);
  return <p>{gameURL}</p>;
}
