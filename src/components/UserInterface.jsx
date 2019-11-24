import React, { useContext } from 'react';
import { gameStates } from '../constants';
import { GameContext } from './GameContext';
import { WelcomeScreen } from './WelcomeScreen';
import { InviteScreen } from './InviteScreen';
import { ReadyUpScreen } from './ReadyUpScreen';
import { StartingScreen } from './StartingScreen';
import { GameScreen } from './GameScreen';
import { GoalScreen } from './GoalScreen';
import { EndScreen } from './EndScreen';

export function UserInterface() {
  const { gameState } = useContext(GameContext);

  return (
    <div className="interface">
      {gameState === gameStates.WELCOME && <WelcomeScreen />}
      {gameState === gameStates.INVITE_PENDING && <InviteScreen />}
      {gameState === gameStates.READY_UP && <ReadyUpScreen />}
      {gameState === gameStates.STARTING && <StartingScreen />}
      {gameState === gameStates.STARTED && <GameScreen />}
      {gameState === gameStates.GOAL && <GoalScreen />}
      {gameState === gameStates.END && <EndScreen />}
    </div>
  );
}
