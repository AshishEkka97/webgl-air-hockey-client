import React, { useContext } from 'react';
import { gameStates } from '../gameStates';
import { GameContext } from './GameContext';
import { InviteScreen } from './InviteScreen';
import { ReadyUpScreen } from './ReadyUpScreen';
import { WelcomeScreen } from './WelcomeScreen';

export function UserInterface() {
  const { gameState } = useContext(GameContext);

  return (
    <div className="interface">
      {gameState === gameStates.WELCOME && <WelcomeScreen />}
      {gameState === gameStates.READY_UP && <ReadyUpScreen />}
      {gameState === gameStates.INVITE_PENDING && <InviteScreen />}
    </div>
  );
}
