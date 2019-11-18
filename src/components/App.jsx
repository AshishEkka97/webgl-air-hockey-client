import React from 'react';
import { GameContextProvider } from './GameContext';
import { UserInterface } from './UserInterface';
import { Scene } from './Scene';

function App() {
  return (
    <GameContextProvider>
      <UserInterface />
      <Scene />
    </GameContextProvider>
  );
}

export default App;
