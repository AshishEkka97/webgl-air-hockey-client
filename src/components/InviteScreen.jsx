import React, { useContext } from 'react';
import { GameContext } from './GameContext';

export function InviteScreen() {
  const { gameID } = useContext(GameContext);
  return (
    <p>
      {process.env.REACT_APP_CLIENT_URL}/{gameID}
    </p>
  );
}
